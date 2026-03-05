(Honestly one of the things i hate the most)


Sequence numbers are basically how the receiver tells "wait, I already got this" from "oh, this is new data."

The classic problem: sender sends a packet, never gets an ACK back, so it retransmits. Now the receiver has no idea if this is a brand new packet or the same one being resent. That's where sequence numbers come in — every packet gets tagged with a number so the receiver can check.

**The simplest version** (stop-and-wait) only needs 0 and 1 — literally one bit. Since you're only ever sending one packet at a time, just alternating between 0 and 1 is enough to catch duplicates. If you're expecting a 0 and get another 0, you know it's a retransmit — toss it, but still send the ACK so the sender can move on.

**Once you pipeline** (send multiple packets without waiting for each ACK), one bit isn't enough anymore. You need a bigger sequence number space because now multiple packets are in flight and you have to be able to tell them apart. Go-Back-N and Selective Repeat each have different minimum requirements because of how their windows work.

The short version: sequence numbers are what stop the receiver from accidentally accepting duplicate data as new, and what let it put things back in order when they arrive out of sequence.




![Reliable Data Transfer (3.0): Sender FSM](https://media.geeksforgeeks.org/wp-content/uploads/20220904072605/s1.png)