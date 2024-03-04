# CPU microarchitecture comparison chart

## Intro

Here are some CPU comparison charts, meant to condense publicly available official information on some popular mass produced chips from various sources into one page.

What is "publicly available" and "official"?\
This is information publicly disclosed by the company's employees at a conference, in the documentation, or in publicly available source code.

Maybe this information comes in handy to someone studying computer architecture and compilers, trying to understand industry trends, optimizing their code, or just looking for references.

## Integer math

|Model          | INT PRF size | INT PRF R/W ports | INT Issue Width | INT ALU units | INT ALU issue rate | Sources
|---------------|--------------|-------------------|-----------------|---------------|------------------- |-----------------|
|AMD Zen        |     168      |                   |                 | 4             |                  4 | HC31
|AMD Zen 2      |     180      |                   |               7 | 4             |                  4 | HC31, HC33
|AMD Zen 3      |     192      |                   |              10 | 6             |                  6 | HC33
|AMD Zen 4      |              |                   |                 |               |                    |
|Itanium Tukwila|     144      |     12R / 8W      |                 |               |                    | HC23
|Itanium Poulson|     185      |     12R / 12W     |                 |               |                    | HC23

## Floating point math

|Model          | Issue Width | PRF        | ROB          | Sources
|---------------|-------------|------------|--------------|-----------------
|AMD Zen        |             | 160 (128b) | 192          | HC31
|AMD Zen 2      |           4 | 160 (256b) | 224          | HC31, HC33
|AMD Zen 3      |           6 |            |              | HC33
|AMD Zen 4      |             |            |              |
|Itanium Tukwila|             |            |              | HC23
|Itanium Poulson|             |            |              | HC23

One curious observation is that if we take the physical register file into account, the register file size become comparable to register file sizes in modern GPUs (per thread/lane). Although with 256-bit wide AVX, a single execution unit is comparable to 8-lane warp(wave) - compare that to 16..32 threads/lanes of execution per SIMD and dozens of warps/waves running in parallel on multiple compute units on modern GPUs.

## Caches

|Model          | L1I Size | L1I ways | L1D latency | L3  Size | Sources
|---------------|----------|----------|-------------|----------|-----------------|
|AMD Zen        |          |          |    8 cycles |          | HC31
|AMD Zen 2      |          |          |    7 cycles | 2x16MB  | HC31, HC33
|AMD Zen 3      |    32 KB |        8 |             | 32 MB    | HC33
|AMD Zen 4      |          |          |             |          |
|Itanium Tukwila|          |          |             |          | HC23
|Itanium Poulson|          |          |             |          | HC23

Some of the info in the chart may change depending on the specific model of the chip.
E.g. desktop chip Ryzen 5 5600 G belongs to the Zen 3 family but its L3 size is "only" 16 MB.
Usually, I think these numbers are given for flagship models.

## Misc

|Model          | ROB      | L1I ways | Sources
|---------------|----------|----------|-----------------|
|AMD Zen        |          |          | HC31
|AMD Zen 2      |          |          | HC31, HC33
|AMD Zen 3      |    32 KB |        8 | HC33
|AMD Zen 4      |          |          |
|Itanium Tukwila|          |          | HC23
|Itanium Poulson|          |          | HC23

## Abbreviations
AGU = Address Generation Unit (AMD term?) \
PRF = Physical Register File \
ROB = ReOrder Buffer

## Sources

HC23: Hot Chips 23. "Poulson: An 8 Core 32 nm Next Generation Intel* Itanium* Processor" by Stephen Undy, Intel ([PDF](https://old.hotchips.org/wp-content/uploads/hc_archives/hc23/HC23.19.7-Server/HC23.19.721-Poulson-Chin-Intel-Revised%202.pdf)) \
HC31: https://hc31.hotchips.org/ \
HC33: Hot Chips 33. "Next Generation Zen 3 Core" by M. Evers, L. Barnes and M. Clark, AMD ([PDF](https://hc33.hotchips.org/assets/program/conference/day1/HC2021.C1.2%20AMD%20Mark%20Evers.pdf))