#NetworkMidtermReview
### What is Head of Line?
The Head of Line (HOL) is a bottleneck in Packet Switched systems where a delayed packet at the front of the queue stops the previous nodes behind it from being processed. This reduces system throughput and increases latency.

### Key Concepts

- **Packet Switched Networks** : HOL Blocking is in Packet Switched networks where data is processed in a Queue Structure

- **Queue or Buffer** : Queues temporarily store packets. If the first of the queue wont process neither will the rest.

- **Packet Order** : Packet Order is a need but maintaining this order is what starts the HOL Blocking.

- **Delay** : Delays in the first packet leads to a chain reaction 

- **Output Contention** : HOL Blocking happens when multiple packets compete for the same output destination. 

- **Independent Destinations** : Affects systems even when they have different destinations since the queue is shared they will all have to wait.

- **Performance Degradation** : Leads to reduced throughput and latency, impacting systems in a negative way.