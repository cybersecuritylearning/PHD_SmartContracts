### [H-1] Proxy-Admin Key Compromise in Zoth (March 21, 2025)

**Description:**
    An attacker compromised an administrative private key controlling Zoth’s proxy contract, allowing them to upgrade it to a malicious implementation. This gave the attacker full control over fund transfers.

**Impact:**
Approximately $8.4–$8.85 million in USD0++ stablecoins were drained. These were converted into 4,223 ETH (worth around $8.3 million at the time) and sent to an external wallet.

**Proof of Concept (PoC):**
The attacker upgraded Zoth’s USD0PPSubVaultUpgradeable proxy contract—via an admin key leak—to point toward a malicious contract. This bypassed any safeguards, enabling immediate and unauthorized fund withdrawal.
