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

## Caches

|Model          | L1I Size | L1I ways | L1D latency | L3  Size | Sources
|---------------|----------|----------|-------------|----------|-----------------|
|AMD Zen        |          |          |    8 cycles |          | HC31
|AMD Zen 2      |          |          |    7 cycles | 2x16MB   | HC31, HC33
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

## Random thoughts

These are some of my thoughts. Unlike the charts, they're (probably) full of mistakes and personal opinions.

### CPU vs GPU register file

One curious observation is that if we take the physical (as opposed to the externally visible "architectural") register file into account, the register file size (both FP and INT) become comparable to register file sizes in modern GPUs (per thread/lane).

### CPU vs GPU performance

Let's do a quick CPU vs GPU back of the envelope arithmetic instruction throughput comparison for a generic Zen 2 generation APU (Renoir) assuming the configuration has 8 cores, 4 ALUs per core and AVX (256 bit) native support, the CPU will be able to process:\
$\text{8 cores} * \text{4 insts per clock} * \text{256 bits} / \text{8 bits} / \text{4 bytes per FP32 number} = \text{at most 256 FP32 instructions per clock}$\
Compare this with the integrated graphics on the same chip that should be capable to do\
$\text{8 CUs} * \text{4 SIMDs per CU} * \text{16 threads per SIMD} = \text{512 threads of FP32}$ (Reference: [Vega ISA](https://www.amd.com/content/dam/amd/en/documents/radeon-tech-docs/instruction-set-architectures/vega-shader-instruction-set-architecture.pdf))\
2 times as much! For FP64, the number for the GPU shouldn't change while the CPU throughput should halve, making it 4 times as slow (and presumably more power hungry).
Note that this is assuming the program is not memory bound which seems to happen more often than many people realize.

## Abbreviations
AGU = Address Generation Unit (AMD term?) \
PRF = Physical Register File \
ROB = ReOrder Buffer

## Sources

HC23: Hot Chips 23. "Poulson: An 8 Core 32 nm Next Generation Intel* Itanium* Processor" by Stephen Undy, Intel ([PDF](https://old.hotchips.org/wp-content/uploads/hc_archives/hc23/HC23.19.7-Server/HC23.19.721-Poulson-Chin-Intel-Revised%202.pdf)) \
HC31: https://hc31.hotchips.org/ \
HC33: Hot Chips 33. "Next Generation Zen 3 Core" by M. Evers, L. Barnes and M. Clark, AMD ([PDF](https://hc33.hotchips.org/assets/program/conference/day1/HC2021.C1.2%20AMD%20Mark%20Evers.pdf))