# RISC-V Ethereum Dev Node Setup

This README explains how to deploy a RISC-V Ubuntu VM using QEMU and prepare it for Ethereum development/debugging (Besu/Java-based clients). This setup uses Ubuntu 20.04.5 preinstalled RISC-V image for the SiFive Unmatched board, which works well in QEMU `virt` emulation.

---

## 1. Download the Ubuntu RISC-V image

We use the Ubuntu 20.04.5 preinstalled server image for RISC-V + Unmatched board.

```bash
wget https://cdimage.ubuntu.com/releases/20.04.5/release/ubuntu-20.04.5-preinstalled-server-riscv64+unmatched.img.xz
```

### Extract the image

```bash
xz -d ubuntu-20.04.5-preinstalled-server-riscv64+unmatched.img.xz
```

You now have:
```
ubuntu-20.04.5-preinstalled-server-riscv64+unmatched.img
```

---

## 2. Install QEMU (on host Ubuntu/OpenStack VM)

```bash
sudo apt update
sudo apt install -y qemu-system-misc qemu-utils
```

---

## 3. Deploy the RISC-V VM using QEMU

Run the following command to start your RISC-V VM:

```bash
qemu-system-riscv64 \
  -machine virt \
  -nographic \
  -m 2048 \
  -smp 2 \
  -kernel /usr/lib/u-boot/qemu-riscv64_smode/uboot.elf \
  -drive file=ubuntu-20.04.5-preinstalled-server-riscv64+unmatched.img,format=raw,if=virtio \
  -netdev user,id=net0 \
  -device virtio-net-device,netdev=net0
```

### Notes:

- `-machine virt` → generic virtual RISC-V machine for QEMU
- `-nographic` → disables graphical display; uses console only
- `-m 2048` → allocate 2GB RAM
- `-smp 2` → 2 CPU cores
- `-kernel` → path to U-Boot
- `-drive ... if=virtio` → virtual disk device
- `-netdev user` + `-device virtio-net-device` → user-mode networking

---
### deploy with qcow2 image

```bash
qemu-system-riscv64 \
  -machine virt \
  -nographic \
  -m 8192 \
  -smp 2 \
  -kernel /usr/lib/u-boot/qemu-riscv64_smode/uboot.elf \
  -drive file=ubuntu-20.04-riscv64.qcow2,format=qcow2,if=virtio \
  -netdev user,id=net0,hostfwd=tcp::2222-:22,hostfwd=tcp::8545-:8545 \
  -device virtio-net-device,netdev=net0
```

## 4. Verify your RISC-V VM

After boot, log in and run:

```bash
uname -m
```

Expected output:
```
riscv64
```

Other helpful checks:

```bash
lscpu
cat /proc/cpuinfo
```

---

## 5. Next steps (Ethereum development)

1. Update system:

```bash
sudo apt update && sudo apt upgrade -y
```

2. Install Java 17:

```bash
sudo apt install -y openjdk-17-jdk-headless
java -version
```

3. Download and run **Hyperledger Besu** for dev/testnet Ethereum experiments:

```bash
wget https://hyperledger.jfrog.io/artifactory/besu-binaries/besu/23.10.1/besu-23.10.1.zip
unzip besu-23.10.1.zip
cd besu-23.10.1
./bin/besu --network=dev
```

- This starts a **private Ethereum dev network**.
- Connect with RPC at `http://localhost:8545` for deploying contracts or debugging EVM transactions.

---

## 6. Persisting your progress

- Your VM state is saved in the disk image (`.img`) file.
- Exiting QEMU will **retain installed packages and blockchain data**.
- Optional: create snapshots with `qemu-img snapshot` to experiment safely.

---

## References

- [Ubuntu RISC-V Preinstalled Images](https://cdimage.ubuntu.com/releases/20.04.5/release/)
- [QEMU RISC-V Documentation](https://wiki.qemu.org/Documentation/Platforms/RISCV)
- [Hyperledger Besu](https://besu.hyperledger.org/)

---

*This README provides a ready-to-use setup for Ethereum experimentation on RISC-V in QEMU.*

# ChatGpt links

- [Mapping ethereum evm in rust](https://chatgpt.com/s/t_69af1d2bb2548191bbe5160dba2a0ac6)