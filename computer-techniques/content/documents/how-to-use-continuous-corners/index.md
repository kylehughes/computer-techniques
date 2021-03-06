---
title: "How To Use Continuous Corners on Apple Platforms"
description: "The easiest way to make shapes look like they belong on Apple platforms."
date: "2021-03-05"
categories:
  - "how-to"
tags:
  - "how-to"
draft: false
---

As of iOS 13, tvOS 13, and macOS 10.15 we have access to the same continous corners that Apple uses. Any shape using a non-zero corner radius that does not use continuous corners will look out of place on modern Apple OSes.

A detailed explanation of continuous corners can be found [here](https://99percentinvisible.org/article/circling-square-designing-squircles-instead-rounded-rectangles/).

Continuous corners are also known as smooth corners or squircles.

## SwiftUI

```swift
RoundedRectangle(cornerRadius: 15, style: .continuous)
```

## CALayer / UIKit / AppKit

```swift
view.layer.cornerRadius = 15
view.layer.cornerCurve = .continuous
```