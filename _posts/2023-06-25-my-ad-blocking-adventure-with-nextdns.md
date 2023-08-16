---
layout: post
title: My Ad-blocking adventure with NextDNS
date: 2023-06-25
author: Aarav Hattangadi
tags: networking dns
---

A few months ago, I was on the lookout for a customizable DNS server, which would let me block ads, monitor traffic, and redirect custom domains to local IP addresses; akin to that of a [PiHole](https://pi-hole.net/), but without needing to run a DNS server 24x7.

On my search, I stumbled upon [NextDNS](https://nextdns.io/), which is a DNS service that lets you do all of the above, and more. It has a very generous free tier (300k requests p/m[^1] [^2]), offering both DNS and DoH (DNS-over-HTTPS). I've been using it for a few months now, and I'm very happy with it.

---

The setup process was a breeze—I just had to create an account, and create a profile with my required settings. Afterwhich, I just had to configure my devices to use the NextDNS servers, and I was good to go.

Ad-blocking works fine as well, and I haven't noticed any issues with it. You can mix-and-match various blocklists, I've found AdGuard's ones to be the best. They can also block trackers, and affiliate links if you wish. Custom blocklists/allowlists are also supported, but I haven't tried them out yet. I've also set up a few custom rules to redirect some domains to local IP addresses, and that works fine as well.

The logging features are good, and you can choose where you'd like to have the logs stored (US/UK/EU/Switzerland) and for how long (1 hour -> 2 days). You can choose what to log as well, which seems like a plus point to me.

The speed is decent as well, and I haven't noticed any issues with it. A `bulldozher` test shows that's its faster than Cloudflare's, and marginally slower (+- 1ms) than Google's.

```
█ Cloudflare DNS
  1.1.1.1
   22.1 ms  32.6 ms 809.4 ms
  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▆▆▆▆▆▆█████████████████

█ Quad9 DNS
  9.9.9.9
  272.4 ms 288.8 ms 293.5 ms
  ██████████████████████████████████████████████████

█ Google DNS
  8.8.8.8
    4.6 ms 380.0 ms 389.5 ms
       ▁▁▁▁▁▁▁▁▁▁▁▃▃▃▃▃▃████████████████████████████

█ Verisign DNS
  64.6.64.6
   60.6 ms  64.0 ms 197.0 ms
  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇███████████████████████

█ 45.90.28.60 DNS
  45.90.28.60
    5.0 ms   5.7 ms 308.5 ms
  ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▂▂▂▂▂▂▂▂▂▂▃▃▃▃▃▃██████

█ Mozilla DoH
  https://mozilla.cloudflare-dns.com/dns-query
   23.3 ms  24.8 ms 482.6 ms
  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▅▅▅▅▅▅██████
```

They also claim to offer malware and phishing protection, but I haven't gotten around to testing that out yet.
[^1]: [NextDNS Pricing](https://nextdns.io/pricing)
[^2]: At the time of writing, once the 300k requests are exhausted, the service will only work as a normal DNS resolver (i.e., no ad-blocking/rewrites/logging/analytics) until the next month.