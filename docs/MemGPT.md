## General Notes

https://arxiv.org/pdf/2310.08560

We allow the LLM to manage what is placed
in its own context (analogous to physical memory) via an
‘LLM OS’, which we call MemGPT

The combined use of a memory-hierarchy, OS functions
and event-based control flow allow MemGPT to handle
unbounded context using LLMs that have finite context
windows. 

MemGPT’s OS-inspired multi-level memory architecture
delineates between two primary memory types: main con-
text (analogous to main memory/physical memory/RAM)
and external context (analogous to disk memory/disk stor-
age). Main context consists of the LLM prompt tokens—
anything in main context is considered in-context and can
be accessed by the LLM processor during inference. Exter-
nal context refers to any information that is held outside of
the LLMs fixed context window.

MemGPT provides function calls that the LLM processor
to manage its own memory without any user intervention.

### Main context (prompt tokens)

The prompt tokens in MemGPT are split into three contiguous sections: 
the system instructions, working context, and FIFO Queue.

#### System instructions

The system instructions are read-
only (static) and contain information on the MemGPT con-
trol flow, the intended usage of the different memory lev-
els, and instructions on how to use the MemGPT functions
(e.g. how to retrieve out-of-context data).

#### Working Context

Working con-
text is a fixed-size read/write block of unstructured text,
writeable only via MemGPT function calls. In conversa-
tional settings, working context is intended to be used to
store key facts, preferences, and other important informa-
tion about the user and the persona the agent is adopting,
allowing the agent to converse fluently with the user.

#### FIFO

The FIFO queue stores a rolling history of messages, including
messages between the agent and user, as well as system
messages (e.g. memory warnings) and function call inputs
and outputs. The first index in the FIFO queue stores a sys-
tem message containing a recursive summary of messages
that have been evicted from the queue.