# Style-match scoring

Shopping style-match scores are fixture-backed, illustrative assessments for the four example products. They are not generated from a photograph or inferred from a visitor's wardrobe.

Each candidate defines three evidence tiers. A supported aesthetic is assigned to exactly one tier:

- Strong: the example product's documented shape and detail directly support the aesthetic.
- Moderate: some documented characteristics support it, but it is not the clearest expression.
- Weak: the documented product characteristics conflict with the aesthetic.

The numeric score belongs to the candidate's evidence tier. Two aesthetics in the same tier intentionally receive the same score. For example, the bomber is a strong match for both Streetwear and East Asian Minimalist, so both receive 89%. The UI must still name and explain the active aesthetic.

`No preference` has no score. A custom or future aesthetic that is absent from a candidate's explicit tier mapping is unsupported and must show an unavailable state; it must not inherit another aesthetic's score.

The shopping recommendation is separate from aesthetic match. Duplicate coverage in the example wardrobe can produce “I’d skip it” even for a strong style match. A weak supported match also produces “I’d skip it.” This separation is intentional and is covered by regression tests.
