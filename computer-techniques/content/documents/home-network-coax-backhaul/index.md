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

In April 2019, I moved into a three-story rental townhome not wired to support [RJ45][rj45] wall plates (see: [Ethernet][ethernet]). I have many wired and wireless devices, and I'm a networking wonk, so I need my residence to have readily-available, multi-modal Internet everywhere. I wanted all three floors to have full 5GHz [WiFi 5](wifi-5) (see: [802.11ac][80211ac]) coverage, as well as gigabit (or close) wired RJ45 access in most rooms. It followed that I would ideally deploy wireless access points from the RJ45 drops on each floor.

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

I won't provide the entire history of MoCA adoption and rollout, but the table below highlights the throughput that each MoCA version can theoretically support. We can see that from MoCA 2.1 Bonded and on, we are dealing with throughput that is suitable to be the backbone of a home network.

|                           | MoCA 1.0 | MoCA 1.1 | MoCA 2.0 | MoCA 2.0 Bonded | MoCA 2.1 | MoCA 2.1 Bonded | MoCA 2.5 | MoCA 3.0 |
| ------------------------- | -------- | -------- | -------- | --------------- | -------- | --------------- | -------- | -------- |
| **Mbit/s actual throughput** | 100      | 175      | 500      | 1000            | 500      | 1000            | 2500     | 10000    |
| **Number of channels bonded** | N/A      | N/A      | N/A      | 2               | N/A      | 2               | 3~5      | <= 4     |

### Deployment

#### Network Topology

This diagram shows the topology of the network at the time of writing. It has been fully operational, with the MoCA backhaul, for 8 months. 

##### [ARRIS SURFboard DOCSIS 3.1 Cable Modem](https://amzn.to/2STs1ME)

The network bridge between the home LAN and the WAN, as accessed through my cable Internet Service Provider.

##### [Ubiquiti UniFi Security Gateway](https://amzn.to/2Qp3Wfa)

The router is responsible for managing the LAN and providing access to the WAN for local devices.

##### [Ubiquiti UniFi Switch, 8-Port 150W](https://amzn.to/2tqaelH)

The "backbone" switch for the home LAN. There is one port dedicated to the router. The rest of the ports are used for access points and wired devices.

##### [Ubiquiti UniFi Cloud Key Gen2 Plus](https://amzn.to/2Qo8Glj)

The host for the Ubiquiti Unifi controller software that I use to manage the network.

##### [Ubiquiti UniFi Access Point AP-AC-HD](https://amzn.to/36ppzlb)

The primary access point for the house, located on the second floor. It handles the most significant number of clients.

##### [Ubiquiti UniFi Access Point AP-AC-HD](https://amzn.to/2rT3Se8) (2x)

The secondary access points for the house, located on the first and third floors. These are smaller access points that carry fewer clients.

The Ubiquiti access points can each act as a switch and provide an RJ45 to extend the wired network.

#### MoCA Integration

MoCA's responsibility in the network deployment is to act as an RJ45-to-coax bridge at the sites where I need to deploy access points. There are three adapters in play:

1. The primary adapter sits between the incoming ISP coax drop and the cable modem on the third floor. This adapter's responsibility is to "inject" the coax backhaul in the house with the MoCA Internet connection, as provided by the cable modem. No access points are dependent on this adapter because the third-floor access  is connected directly to the switch.
1. A bridging adapter is deployed on the first floor, connected to the room's coaxial F connector, and provides Internet access to the first-floor access point.
1. A bridging adapter is deployed on the second floor, connected to the room's coaxial F connector, and provides Internet access to the second-floor access point.

## Other Options

Two popular options for running a home network in a building not wired for RJ45 are [Powerline](https://www.techradar.com/news/networking/powerline-networking-what-you-need-to-know-930691) and [mesh networks](https://www.tomsguide.com/us/what-is-mesh-wifi-router,news-24580.html). 

My cursory investigation found that Powerline isn't suitable for gigabit speeds. My inner networking wonk finds wireless backbones to be distasteful, so running a mesh network was never a personal consideration.

