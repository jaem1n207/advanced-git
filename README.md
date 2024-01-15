# Git 활용 잘해보기

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjaem1n207%2Fadvanced-git&count_bg=%233182F6&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

Git의 다양한 기능을 심도 있게 다루고 공부한 것들을 정리해 생산성을 극대화하기 위해 작성된 문서입니다.

> [!WARNING]
> 이 문서에서 설명하는 특정 전략이 100% 정답이라고 말할 순 없지만 도움은 될 것이라 확신합니다.
>
> 잘못된 정보를 전달하지 않기 위해 최대한 여러 블로그 글을 참고하여 작성되었지만, 잘못된 부분이 있을 수 있으니 **절대로 맹신하지 말아 주세요.**

## 목차

<!-- AUTO-GENERATED-CONTENT:START (TOC:collapse=true&collapseText=자세히 보려면 클릭하세요&excludeText=목차) -->
<details>
<summary>자세히 보려면 클릭하세요</summary>

- [Git Stash](#git-stash)
- [Merge와 Rebase](#merge%EC%99%80-rebase)
- [상황에 맞게 사용하는 Merge, Rebase, Squash](#%EC%83%81%ED%99%A9%EC%97%90-%EB%A7%9E%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-merge-rebase-squash)

</details>
<!-- CUSTOM-AUTO-GENERATED-CONTENT:END -->

## Git Stash

`git stash`를 실행하면 **커밋하지 않고도 작업을 저장**할 수 있습니다. 보통 아래와 같은 상황일 때 유용합니다.

`feat/1` 브랜치에서 1번 기능을 작업하고 있습니다. 그러다 급하게 수정해야 할 사항이 생겨 `hotfix/1` 브랜치로 전환해야 하는 경우가 종종 있습니다. 하지만 아직 `feat/1` 브랜치에 커밋되지 않은 코드가 꽤 지저분(디버깅 코드가 포함되어 있는 등)하다면 아직 커밋하고 싶지 않을 겁니다.

이때 `git stash`를 실행하면 됩니다. `stash`는 브랜치에 임시 로컬 커밋을 저장하는 것과 같다고 생각하면 됩니다. 또한 `stash`는 원격 레포로 푸시할 수 없으므로 개인적으로 용도로 실행하면 됩니다.

이제 기존 브랜치의 커밋 로그를 더럽히지 않고 안전하게 브랜치를 변경할 수 있게 되었습니다. 작업을 끝내고 다시 `feat/1` 브랜치로 돌아와서 **저장해둔 코드를 불러오고 싶다면** `git stash apply`를 실행하면 저장된 코드를 쉽게 불러올 수 있습니다.

`stash`를 여러 번 실행했었고 그 중 **가장 최근** stash를 적용하고 싶다면 아래처럼 하면 됩니다:

```bash
git stash list
> stash@{0}: WIP on test/stash: 1fe8781 test: ff-only2
> stash@{1}: WIP on test/stash: 1fe8781 test: ff-only2
> stash@{2}: WIP on test/stash: 1fe8781 test: ff-only2

git stash apply stash@{0}
```

stash로 저장된 커밋을 **새로운 브랜치에 적용**하고 싶다면 아래처럼 하면 됩니다:

```bash
git stash branch new-branch-name
> 새로 만든 'new-branch-name' 브랜치로 전환합니다
> 현재 브랜치 new-branch-name
```

만약 저장되어 있는 일부 stash를 **제거**하고 싶다면 `git drop`을 실행하여 stash를 개별적으로 제거하거나, `git stash clear`를 사용하여 모든 stash를 제거할 수 있습니다.

## Merge와 Rebase

`merge`와 `rebase` 명령은 서로 다른 브랜치의 커밋을 합칩니다.

## 상황에 맞게 사용하는 Merge, Rebase, Squash

> [!NOTE]  
> **스쿼시**는 여러 개의 커밋 기록을 하나의 커밋 기록으로 합치는 방법입니다. 주로 팀원들과 PR에서 변경 사항에 대해 논의하기 전에 커밋 기록을 정리하고 단순화하는 데 사용합니다.
