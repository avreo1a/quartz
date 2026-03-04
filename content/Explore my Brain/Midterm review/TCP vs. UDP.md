
#NetworkMidtermReview

TCP ( Transmission Control Protocol ) - Connection-oriented, reliable

Establishes a 3 way Handshake (SYN -> SYN-ACK -> ACK)

Guarantees ordered, reliable delivery. (Lost packets are retransmitted)

Flow Control ( Sliding Widnow ) and congestion control

Higher overhead, slower

Use cases: HTTP/HTTPS,SSH,FTP,Email

UDP (User Datagram Protocol) - Connectionless Unreliable 

No Handshake - Just fire and forget

No guarantee of delivery, ordering, or duplicate protection

Much lower overhead, faster

Use cases: DNS, video streaming VOIP, online gaming.

Key tradeoffs: TCP trades speed for reliability. UDP trades reliability for speed.





![[tcp-header.webp]]
[![TCP Header (Computer Network) | TCP Header Format | TCP Segment Structure](https://i.ytimg.com/vi/D1cei2NYCDw/maxresdefault.jpg)
![UDP (User Datagram Protocol) Header | Example of UDP Checksum | Realtime  application of UDP Protocol - YouTube](https://i.ytimg.com/vi/COojCgbqJWI/maxresdefault.jpg)