---
title: "Single-Family Home Network Deployment with Coaxial Backhaul"
description: "A small case study on deploying a home network in buildings that are wired for coaxial cable access."
date: "2020-01-04"
categories:
  - "coaxial-backhaul"
  - "home-network"
tags:
  - "coaxial-backhaul"
  - "home-network"
draft: true
---

## Problem

In April 2019, I moved into a three-story rental townhome that was not wired to support [RJ45][rj45] wall plates (see: [Ethernet][ethernet]). I have many wired and wireless devices, and I'm a networking wonk, so I need my residence to have readily-available, multi-modal Internet everywhere. I wanted all three floors to have full 5GHz [WiFi 5](wifi-5) (see: [802.11ac][80211ac]) coverage, as well as gigabit (or close) wired RJ45 access in most rooms. It followed that I would ideally deploy wireless access points from the RJ45 drops on each floor.

Rewiring the residence with Cat6 cables was not possible because it was a rental. Wired with [RG59 or RG6][coax-cable-type] (see: Coax) like many modern American homes, we find wall plates with [F connectors][f-connector] in most rooms.

[80211ac]: https://techterms.com/definition/80211ac
[coax-cable-type]: https://techterms.com/definition/coaxial_cable
[ethernet]: https://techterms.com/definition/ethernet
[f-connector]: https://en.wikipedia.org/wiki/F_connector
[rj45]: https://techterms.com/definition/rj45
[wifi-5]: https://www.accessagility.com/blog/wifi-6-wifi-5-wifi-4-new-generational-wifi-names-from-the-wifi-alliance

## Solution

### MoCA

The [Multimedia over Coax Alliance][moca], also known as MoCA, exists to solve this problem. They are a collection of ["pay TV operators, OEMs, CE manufacturers, and IC vendors."][moca_who] In their words:

> MoCA® is an international industry standard alliance developing technology for home networking and broadband access.
> MoCA technology runs over the existing coaxial cabling, and is the in-home backbone for Wi-Fi®.
> Products integrating MoCA technology are found in the service provider, custom installer and consumer/retail channels.
>
> ...
>
> MoCA technology has been adopted by operators on five continents.
>
> ...
>
> MoCA technology is a layer 2 transport protocol enabling the distribution of content over the existing in-home coaxial TV cabling. The primary job of MoCA technology is to guarantee delivery of packets to their destination.

The [MoCA FAQ][moca_faq] is an excellent resource for accurate technical information.

In my words:

> The MoCA (group) created the MoCA (technology) to enable IP networking over coaxial cabling.

MoCA has many applications, but we care about the broadest one, which is inter-networking a building for wired LAN over coaxial cables. Modern MoCA performance (the latest specification being 3.0 at the time of writing) is more than suitable to run a gigabit backhaul for an entire house.

In practice, MoCA adapters are small black boxes that take in DC power and a coaxial cable with an F connector and provide an RJ45 port.

This approach fit my use case well and was straightforward to deploy. I only became aware of MoCA when the technology was mature enough for my needs, which is a satisfying experience for any technologist.

[moca]: http://www.mocalliance.org/
[moca_faq]: http://www.mocalliance.org/about/faqs.htm
[moca_who]: https://en.wikipedia.org/wiki/Multimedia_over_Coax_Alliance#Membership

#### MoCA Performance

I won't provide the entire history of MoCA adoption and rollout, but the table below highlights the throughput that each MoCA version can theoretically support. We can see that from MoCA 2.1 Bonded and on we are dealing with throughput that is suitable to run a home LAN over.

|                           | MoCA 1.0 | MoCA 1.1 | MoCA 2.0 | MoCA 2.0 Bonded | MoCA 2.1 | MoCA 2.1 Bonded | MoCA 2.5 | MoCA 3.0 |
| ------------------------- | -------- | -------- | -------- | --------------- | -------- | --------------- | -------- | -------- |
| **Mbit/s actual throughput** | 100      | 175      | 500      | 1000            | 500      | 1000            | 2500     | 10000    |
| **Number of channels bonded** | N/A      | N/A      | N/A      | 2               | N/A      | 2               | 3~5      | <= 4     |

### Deployment

I have diagramed my general network topology. Unneccessary implementation details are left out.

- **Modem**: The cable modem which is the network bridge between the home LAN and the WAN, as accessed through my cable provider.
- **Ubiquiti Security Gateway**: The router behind which the home LAN operates and which. WAN access comes in from the modem. 
- **Ubiquiti 10-Port Switch**: The "backbone" switch for the home LAN. One port is dedicated for the router, so that devices on the LAN can communicate with each other and with the WAN. The rest of the ports are used for access points and wired devices.
- **Ubiquiti Cloud Key Gen 2**: The host for the Ubiquiti Unifi controller software that I use to manage the network.
- **Ubiquiti AP-HD**:
- **Ubiquiti AP-AC-Pro** (2x): 

## Other Options

### Powerline

### Mesh Access Points

