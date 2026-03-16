#NetworkMidtermReview 

### Processing Delay
[[TCP vs. UDP]]

When the packet arrives at the router, the router has to check the packet header to determine where to forward it, check for hash errors, and perform any required lookup. The time that it takes to figure all of this out is the Processing Delay


### Queuing Delay

After the packet knows where its going, it has to sit in a queue (also a buffer), until the outgoing link is free. If the link is idle and the queue is empty the delay is zero. But given there are a bunch of packets in the queue you'd have to wait longer. At super high queues, queuing delays can be whats causing the latency time to increase.

### Transmission Delay

Once a packet reaches the front of the queue, the router begins pushing the bits in the wire. Transmission delay is the time required to take packets

### Propagation Delay

The time taken for a signal to reach its destination.

### Total Node Delay

The total delay at a single node is the sum of four components:

d_nodal = d_proc + d_queue + d_trans + d_prop

E2E latency across a network path is then the accumulation of nodal delays at every router along the way, plus the propagation for each delay.