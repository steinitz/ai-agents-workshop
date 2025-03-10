import { ToolDecorator } from "../decorators/ToolDecorator";
import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'

// Make sure to set these environment variables in your project.
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface Task {
    id: number;
    description: string;
    due_date: string | null;
    status: string;
    created_at: string;
}

export class TaskTools {
    @ToolDecorator({
        docstring: `Adds a new task to the system.

Parameters:
- description: The description of the task.
- dueDate: (Optional) Due date for the task in YYYY-MM-DD format.`,
        parameters: {
            description: { type: "string", description: "Task description" },
            dueDate: { type: "string", description: "Due date (YYYY-MM-DD) (optional)" },
        },
    })
    async addTask(description: string, dueDate?: string): Promise<string> {
        const {data, error, status} = await supabase
            .from("tasks")
            .insert([{ description, due_date: dueDate || null, status: "pending", created_at: new Date().toISOString() }]);
        if (error) {
            return `Error adding task: ${error.message}`;
        }

        if (status == 201) {
            const { data, error } = await supabase
                .from("tasks")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(1);

            return `Task added with ID: ${data ? (data as any)[0].id : ''}`;
        }

        return "Task added, but no ID returned.";
    }

    @ToolDecorator({
        docstring: `Updates an existing task.

Parameters:
- id: The ID of the task.
- description: (Optional) New description.
- dueDate: (Optional) New due date in YYYY-MM-DD format.
- status: (Optional) New status (e.g., "completed", "pending").`,
        parameters: {
            id: { type: "string", description: "Task ID" },
            description: { type: "string", description: "New task description (optional)" },
            dueDate: { type: "string", description: "New due date (YYYY-MM-DD) (optional)" },
            status: { type: "string", description: "New status (optional)" },
        },
    })
    async updateTask(id: string, description?: string, dueDate?: string, status?: string): Promise<string> {
        const updateData: any = {};
        if (description !== undefined) updateData.description = description;
        if (dueDate !== undefined) updateData.due_date = dueDate;
        if (status !== undefined) updateData.status = status;
        const { error } = await supabase
            .from("tasks")
            .update(updateData)
            .eq("id", id);
        if (error) {
            return `Error updating task: ${error.message}`;
        }
        return `Task ${id} updated successfully.`;
    }

    @ToolDecorator({
        docstring: `Deletes a task from the system.

Parameters:
- id: The ID of the task to delete.`,
        parameters: {
            id: { type: "string", description: "Task ID" },
        },
    })
    async deleteTask(id: string): Promise<string> {
        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", id);
        if (error) {
            return `Error deleting task: ${error.message}`;
        }
        return `Task ${id} deleted successfully.`;
    }

    @ToolDecorator({
        docstring: `Lists all tasks in the system.

No parameters required.`,
        parameters: {},
    })
    async listTasks(): Promise<string> {
        const { data, error } = await supabase
            .from("tasks")
            .select("*");
        if (error) {
            return `Error listing tasks: ${error.message}`;
        }
        if (!data || data.length === 0) {
            return "No tasks found.";
        }
        let summary = `Found ${data.length} tasks:\n`;
        data.forEach((task: any) => {
            summary += `ID: ${task.id}, Description: ${task.description}, Due: ${task.due_date || "N/A"}, Status: ${task.status}\n`;
        });
        return summary;
    }
}
