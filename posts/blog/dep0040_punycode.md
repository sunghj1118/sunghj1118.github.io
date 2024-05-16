# [DEP0040] DeprecationWarning: The `punycode` module is deprecated.

## Background
I was trying to set up my blog while following the instructions in the Gatsby documentation. However, I encountered a `DeprecationWarning` for the `punycode` module.

## Problem
```
(node:98880) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```
## Solution Flow
- Searching for solutions on the internet

["[DEP0040] The punycode module is deprecated" with Node.js 21.x
](https://github.com/yarnpkg/yarn/issues/9005)

![github](../../images/dep0040_punycode.md/2024-05-16-10.24.28AM.png)

I am using npm so everything else regarding yarn is irrelevant.

- Checking the Punycode documentation

[Punycode Documentation](https://github.com/mathiasbynens/punycode.js#installation)

![docs](../../images/dep0040_punycode.md/2024-05-16-10.31.27AM.png)

I tried installing the `punycode` module using the command `npm install punycode` but it did not work. Instead, I found out that the problem might be a compatibility issue between the `gatsby-transformer-remark` and `gatsby`.

![error](../../images/dep0040_punycode.md/2024-05-16-11.16.15AM.png)

Downgrading my `gatsby-transformer-remark` version to `^4.0.0` resolved the issue.

![succesful compile](../../images/dep0040_punycode.md/2024-05-16-11.19.27AM.png)
