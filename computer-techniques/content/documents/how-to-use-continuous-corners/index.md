---
title: "How To Use Continuous Corners on iOS, macOS, and tvOS"
description: "The canonical shape for rounded corners on Apple platforms."
date: "2021-03-05"
categories:
  - "how-to"
tags:
  - "appkit"
  - "core-animation"
  - "how-to"
  - "swift"
  - "swiftui"
  - "uikit"
draft: false
---

Available for iOS 13+, macOS 10.15+, and tvOS 13+.

## SwiftUI

```swift
RoundedRectangle(cornerRadius: 15, style: .continuous)
```

## CALayer / UIKit / AppKit

```swift
view.layer.cornerRadius = 15
view.layer.cornerCurve = .continuous
```