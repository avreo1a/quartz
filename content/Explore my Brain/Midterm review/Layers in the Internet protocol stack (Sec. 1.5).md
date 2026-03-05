
There are 5 layers of Internet protocol stack each having different job.


Application - This is where your actual programs live. HTTP, DNS, SMTP — whatever protocol your app uses to talk to another app over the network. This layer doesn't care _how_ the data gets there, just what it says.

Transport - Takes the application's message and handles getting it from one _process_ to another. This is where TCP and UDP live. TCP gives you reliability, ordering, congestion control. UDP just sends it and doesn't look back. The unit here is a **segment**.

Network - Gets the segment from one host to another across the internet. This the Ips job, routing, addressing, and figuring out the path. The unit is datagram

Data Link - Moves across the datagram in one hop, one node to the other (router to router, host to router, etc)


Physical - The actual bits on the wire of RF network. Things like electronic signals, light pulses, radio waves, No logical structure and just raw transmission. 


```
[ Physical ][ Link header ][ IP header ][ TCP header ][ App data ]
```