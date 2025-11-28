---
id: setup-environment
title: Docker Installation & Setup
sidebar_label: Setup Environment
sidebar_position: 2
tags:
  [
    docker,
    installation,
    setup,
    docker-desktop
  ]
description: Learn how to install Docker on Windows, macOS, and Linux. Step-by-step guide to set up Docker Desktop and verify your installation.
---

# Docker Installation & Setup

Setting up Docker is the first step to start containerizing your applications. This guide covers installation on all major operating systems.

## System Requirements

### Windows
- **Windows 10 64-bit**: Pro, Enterprise, or Education (Build 15063 or later)
- **Windows 11 64-bit**: Home or Pro version 21H2 or higher
- **WSL 2** feature enabled
- **Hyper-V** and **Containers** Windows features enabled

### macOS
- **macOS 10.15** or newer
- **4 GB RAM** minimum
- **VirtualBox** prior to version 4.3.30 must be uninstalled

### Linux
- **64-bit kernel** and CPU support for virtualization
- **KVM virtualization** support
- **QEMU** version 5.2 or newer
- **systemd** init system

---

## Windows Installation

### Method 1: Docker Desktop (Recommended)

**Step 1: Download Docker Desktop**
1. Visit [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. Click "Download for Windows"
3. Run the installer `Docker Desktop Installer.exe`

**Step 2: Installation Process**
1. Follow the installation wizard
2. Ensure "Use WSL 2 instead of Hyper-V" is checked
3. Complete the installation and restart your computer

**Step 3: Enable WSL 2**
```powershell
# Run in PowerShell as Administrator
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Restart your computer, then set WSL 2 as default
wsl --set-default-version 2
```

**Step 4: Verify Installation**
```bash
docker --version
docker run hello-world
```

---

## macOS Installation

### Docker Desktop for Mac

**Step 1: Download**
1. Visit [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
2. Choose your chip type:
   - **Apple Silicon (M1/M2)**: Mac with Apple chip
   - **Intel**: Mac with Intel chip

**Step 2: Install**
1. Open the downloaded `.dmg` file
2. Drag Docker to Applications folder
3. Launch Docker from Applications
4. Follow the setup assistant

**Step 3: Verify Installation**
```bash
docker --version
docker run hello-world
```

### Alternative: Homebrew Installation
```bash
# Install Docker using Homebrew
brew install --cask docker

# Start Docker Desktop
open /Applications/Docker.app
```

---

## Linux Installation

### Ubuntu/Debian

**Step 1: Update Package Index**
```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

**Step 2: Add Docker's GPG Key**
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

**Step 3: Add Docker Repository**
```bash
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**Step 4: Install Docker**
```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

**Step 5: Add User to Docker Group**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### CentOS/RHEL/Fedora

**Step 1: Install Required Packages**
```bash
sudo yum install -y yum-utils
```

**Step 2: Add Docker Repository**
```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

**Step 3: Install Docker**
```bash
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

**Step 4: Start Docker Service**
```bash
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

---

## Verification & Testing

### Basic Verification
```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version

# View system information
docker system info

# Test with hello-world
docker run hello-world
```

### Advanced Testing
```bash
# Run a simple web server
docker run -d -p 8080:80 --name test-nginx nginx

# Check if it's running
docker ps

# Test in browser: http://localhost:8080

# Clean up
docker stop test-nginx
docker rm test-nginx
```

---

## Docker Desktop Features

### Dashboard
- **Visual container management**
- **Image browsing and management**
- **Volume and network management**
- **Extension marketplace**

### Settings Configuration
1. **Resources**: Adjust CPU, Memory, Swap, Disk usage
2. **File Sharing**: Configure shared directories
3. **Proxies**: Set up corporate proxy settings
4. **Docker Engine**: Advanced daemon configuration

### Useful Commands
```bash
# Start Docker Desktop
# Windows: Start from Start Menu
# macOS: Open from Applications
# Linux: systemctl start docker

# Check Docker Desktop status
docker system info

# Update Docker Desktop
# Use built-in updater or download latest version
```

---

## Troubleshooting Common Issues

### Windows Issues

**WSL 2 Installation Failed**
```powershell
# Enable Windows features manually
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform

# Download and install WSL 2 kernel update
# https://aka.ms/wsl2kernel
```

**Docker Desktop Won't Start**
- Ensure Hyper-V is enabled
- Check Windows version compatibility
- Restart Docker Desktop service

### macOS Issues

**Permission Denied**
```bash
# Fix Docker socket permissions
sudo chown $USER /var/run/docker.sock
```

**Resource Allocation**
- Increase memory allocation in Docker Desktop settings
- Close other resource-intensive applications

### Linux Issues

**Permission Denied**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and log back in
```

**Docker Daemon Not Running**
```bash
# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Check status
sudo systemctl status docker
```

---

## Next Steps

Now that Docker is installed and running:

1. ✅ **Learn Docker Commands** - Master essential Docker CLI commands
2. ✅ **Create Your First Dockerfile** - Build custom images
3. ✅ **Explore Docker Hub** - Find and use existing images
4. ✅ **Try Docker Compose** - Manage multi-container applications

**Congratulations!** 🎉 You now have Docker running on your system. Ready to start containerizing applications!

---

## Quick Reference

### Installation Commands Summary

**Ubuntu/Debian:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**CentOS/RHEL:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl start docker
sudo usermod -aG docker $USER
```

**Verification:**
```bash
docker --version && docker run hello-world
```