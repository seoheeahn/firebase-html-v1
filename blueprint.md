# AlgoBee Profile Page Blueprint

## Overview
A modern, tech-focused profile page for the character "AlgoBee". This page highlights the character's skills, bio, and provides links to social media profiles using interactive SNS buttons.

## Project Details
- **Character Name:** AlgoBee
- **Features:**
    - **Pixel Art Hero**: Cute CSS-drawn dot bee character.
    - **Retro Aesthetics**: Uses 'Press Start 2P' font and blocky UI elements.
    - **Interactive SNS buttons**: Hover effect with pixel-style shadows.
    - **SkillBadge (Web Component)**: Pixelated outline style (#tag format).
    - **White Mode (Light Theme)**: Clean background with subtle grid lines.

## Cloudflare Pages Deployment (GitHub Integration)
이 프로젝트는 GitHub에 푸시하면 자동으로 Cloudflare Pages에 배포되도록 설계되었습니다.
1. **Cloudflare Pages** 대시보드에 접속합니다.
2. **"Create a project" > "Connect to Git"**을 선택합니다.
3. 이 GitHub 저장소 (`firebase-html-v1`)를 선택합니다.
4. **Build settings**:
    - **Framework preset**: `None`
    - **Build command**: (비워둠)
    - **Build output directory**: `/` (루트 디렉토리)
5. **Save and Deploy**를 누르면 이후 GitHub에 푸시할 때마다 자동으로 배포됩니다.

## Current Plan: Cloudflare Deployment Setup
1. **Create `package.json`**: Add `wrangler` and basic scripts.
2. **Add `.node-version`**: Set Node.js version for Cloudflare build.
3. **Push to GitHub**: Changes will trigger deployment if connected.
