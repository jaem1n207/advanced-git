# Git 활용 잘해보기

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjaem1n207%2Fadvanced-git&count_bg=%233182F6&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

**Q: 이 문서는 왜 작성되었나요?**

프로젝트를 할 때 항상 변수는 존재하기에 작업 도중 History를 수정해야 하는 상황은 자주 발생합니다. 이런 상황에서 사용할 수 있는 전략을 설명합니다. 더불어 Git의 다양한 기능을 심도 있게 다뤄 보고 더 효율적으로 작업할 수 있도록 하기 위함입니다.

**Q: 왜 "Git History"를 관리해야 하나요?**

**A:** Git History는 프로젝트의 **성장과 진행 과정**을 나타냅니다. 그렇기에 협업하는 사람이 많아질수록 Git History를 관리하는 것은 중요해집니다.

> [!WARNING]
> 이 문서에서 설명하는 특정 전략이 100% 정답이라고 말할 순 없지만 도움은 될 것이라 확신합니다.
>
> 실무에서 자주 마주치는 상황에서 Git History를 관리하는 방법, Git을 통해 더 효율적으로 작업할 수 있도록 돕는 여러 기능을 다룹니다. 따라서 개념은 가볍게 다루고 넘어가므로 개념이나 원리에 대해 자세히 알고 싶다면 [Git 공식 문서](https://git-scm.com/doc)를 참고해주세요.

## 목차

<!-- AUTO-GENERATED-CONTENT:START (TOC:collapse=true&collapseText=자세히 보려면 클릭하세요&excludeText=목차) -->
<details>
<summary>자세히 보려면 클릭하세요</summary>

- [Git Stash](#git-stash)
- [Git Reset](#git-reset)
- [Git Merge](#git-merge)
- [Git Rebase](#git-rebase)
- [상황에 맞게 사용하는 Merge, Rebase, Squash](#%EC%83%81%ED%99%A9%EC%97%90-%EB%A7%9E%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-merge-rebase-squash)
- [마지막 커밋을 수정하는 방법](#%EB%A7%88%EC%A7%80%EB%A7%89-%EC%BB%A4%EB%B0%8B%EC%9D%84-%EC%88%98%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
- [여러 개의 커밋 메시지를 수정하고 싶은 경우](#%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A5%BC-%EC%88%98%EC%A0%95%ED%95%98%EA%B3%A0-%EC%8B%B6%EC%9D%80-%EA%B2%BD%EC%9A%B0)
- [참고](#%EC%B0%B8%EA%B3%A0)

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
git stash branch ${브랜치 이름}
> 새로 만든 ${브랜치 이름} 브랜치로 전환합니다
> 현재 브랜치 ${브랜치 이름}
```

만약 저장되어 있는 일부 stash를 **제거**하고 싶다면 `git drop`을 실행하여 stash를 개별적으로 제거하거나, `git stash clear`를 사용하여 모든 stash를 제거할 수 있습니다.

## Git Reset

`git reset`을 실행하면 **커밋을 초기화**할 수 있습니다. 보통 실수로 지저분한 코드를 커밋한 상황일 때 유용하게 사용할 수 있습니다.

> [!WARNING]
> 단순히 마지막 커밋 메시지를 수정하거나 다른 커밋 안에 밀어넣는 작업을 하고 싶다면 [마지막 커밋을 수정하는 방법](#%EB%A7%88%EC%A7%80%EB%A7%89-%EC%BB%A4%EB%B0%8B%EC%9D%84-%EC%88%98%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95) 섹션을 참고해주세요.
> 최근 커밋이 아니라 여러 개의 예전 커밋을 수정하려면 [여러 개의 커밋 메시지를 수정하고 싶은 경우](#%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A5%BC-%EC%88%98%EC%A0%95%ED%95%98%EA%B3%A0-%EC%8B%B6%EC%9D%80-%EA%B2%BD%EC%9A%B0) 섹션을 참고해주세요.

예를 들어보겠습니다. `feat/1` 브랜치에서 지저분한 코드까지 포함되어 커밋되었습니다. 이 커밋을 되돌려서 지저분한 코드를 포함한 파일을 제외하고 다시 커밋하고 싶습니다. 이 커밋이 가장 최근 커밋이라면 아래처럼 초기화할 수 있습니다:

```bash
git reset --soft HEAD~1
```

여기서 `--soft` 옵션을 사용했는데 이는 HEAD가 가리키는 브랜치를 이동시키는 것까지만 진행합니다.
<small>`--hard` 옵션도 있으며 작동 원리 등 자세한 내용은 [Git 공식 문서](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0)에서 확인해주세요.</small>

## Git Merge

## Git Rebase

`merge`와 `rebase` 명령은 서로 다른 브랜치의 커밋을 합칩니다.

## 상황에 맞게 사용하는 Merge, Rebase, Squash

> [!NOTE]  
> **스쿼시**는 여러 개의 커밋 기록을 하나의 커밋 기록으로 합치는 방법입니다. 주로 팀원들과 PR에서 변경 사항에 대해 논의하기 전에 커밋 기록을 정리하고 단순화하는 데 사용합니다.

## 마지막 커밋을 수정하는 방법

보통 커밋 로그를 관리하는 일 중 **마지막 커밋을 수정**하는 상황이 가장 잦습니다.(저만 그런 걸수도 있고요) 크게 두 가지로 나눌 수 있습니다:

1. 커밋 메시지만 수정
2. 나중에 수정한 파일을 다른 커밋 안에 밀어넣는 작업

**커밋 메시지를 수정**하는 방법은 아래 명령어를 실행하면 됩니다:

```bash
git commit --amend
```

이 명령은 아래 이미지처럼 텍스트 편집기를 실행시켜서 마지막 커밋 메시지를 열어줍니다.

<p align="center">
  <img width='480' src="./images/amend/modify-last-commit-msg.webp">
</p>

여기에 메시지를 바꾸고 편집기를 닫으면 편집기는 바뀐 메시지로 마지막 커밋을 수정합니다.
<small>`vi` 편집기에 익숙하지 않다면 [VI 에디터 명령어 정리](https://emptyreset.tistory.com/15)를 참고해주세요. 간단히 설명하자면 에디터에서 `ESC`를 눌러 모드 전환을, `i`, `a`, `o`, `s`를 눌러 편집 모드로 전환을, `:`를 누르고 `q` 또는 `wq`를 눌러 나가거나 저장할 수 있습니다.</small>

커밋하고 난 후 새로 만든 파일이나 수정한 파일을 **가장 최근 커밋에 밀어넣고 싶은 경우**엔 아래처럼 하면 됩니다:

```bash
git add ${파일명}
git commit --amend
```

`git add` 명령어로 원하는 파일을 Staging Area에 넣고 `git commit --amend` 명령어를 입력해 커밋하면 커밋 자체가 수정되면서 추가로 수정사항을 밀어넣을 수 있습니다.
이때 **SHA-1 값이 바뀌기** 때문에 과거의 커밋을 변경할 때 주의해야 합니다. `Rebase`와 같이 이미 Push한 커밋은 수정하면 안 됩니다.

만약 커밋 메시지를 수정할 필요가 없이 코드의 오타를 살짝 고치는 정도의 사소한 수정을 할 경우엔 **편집기를 열지 않고** 싶을 수도 있습니다. 이 경우엔 아래와 같이 `--no-edit` 옵션을 사용하면 편집기 실행 없이 수정할 수 있습니다.

```bash
git commit --amend --no-edit
```

## 여러 개의 커밋 메시지를 수정하고 싶은 경우

`git rebase -i` 를 실행하면 최근 커밋이 아니라 **여러 개의 예전 커밋을 수정**할 수 있습니다. 이는 커밋 로그를 정리하는 데 매우 유용하게 사용할 수 있습니다. 예를 들어보겠습니다:

`A 변수명 수정` - `A 로직 수정` - `파일명 수정` 순으로 작업을 하다가 A 변수에 더 어울리는 이름이 생각 나 커밋을 추가했습니다. 그럼 `A 변수명 수정` - `A 로직 수정` - `파일명 수정` - `A 변수명 수정` 형태로 커밋 로그가 복잡해집니다. 이때 `git rebase -i` 를 사용해 순서를 바꾸고 커밋을 합쳐 `A 변수명 수정` - `A 로직 수정` - `파일명 수정` 처럼 만들 수 있습니다.

어떻게 사용하는지 살펴보겠습니다. 아래 이미지는 수정 전 커밋 로그입니다. 여기서 `A 변수명 다시 수정` 커밋을 `A 변수명 수정` 커밋과 합쳐보겠습니다

<p align="center">
  <img width='480' src="./images/rebase/duplicate-msg.webp">
</p>

```bash
git rebase -i ${수정할 커밋의 이전 커밋}
```

`git rebase -i` 명령어를 사용하면 대화형 모드로 들어갑니다. 이때 내가 수정하고 싶은 커밋의 이전 커밋을 기준으로 실행해야 합니다. 예를 들어, `A` 커밋이 `HEAD~3`라면 `HEAD~4`를 사용합니다. 커밋 해시를 기준으로 입력할 수도 있습니다.

입력하고 나면 아래 이미지처럼 출력되는 `vi` 편집기를 볼 수 있습니다.

<p align="center">
  <img width='480' src="./images/rebase/rebase-vi-editor.webp">
</p>

각 라인은 `[명령어] [커밋 해시] [커밋 메시지]` 순서대로 구성되어 있습니다. 아래 주석에선 각 커밋에 사용할 수 있는 명령어들의 목록과 역할을 확인할 수 있습니다.

여기서 `squash`와 `fixup`이 **특정 커밋을 이전 커밋과 합치는** 명령어입니다. `squash`는 각 커밋들의 메시지가 합쳐지는 반면, `fixup` 은 이전의 커밋 메시지만 남기는 차이점이 있습니다.

이전 커밋 메시지만 남기면 되므로 `fixup`을 사용해보겠습니다.

<p align="center">
  <img width='480' src="./images/rebase/fixup-command.webp">
</p>

합쳐지길 원하는 커밋을 찾아 `pick`을 `fixup`으로 변경했습니다. 그리고 `A 변수명 다시 수정` 커밋을 **`A 변수명 수정` 커밋 바로 아래로 이동**시켰습니다. 이후 변경사항을 저장하고 편집기를 종료합니다.

똑같은 라인의 변수명을 수정했으므로 `rebase` 중에 **충돌이 발생**했습니다. 해결 후 `git rebase --continue` 명령어를 입력해 계속 진행해줍니다. 이때 주의할 점은, **이미 원격 레포에 푸시된 브랜치의 커밋을 로컬에서 `rebase`해서 푸시하는 경우**는 없어야 합니다. `rebase`는 기존의 커밋을 재사용하는 것이 아니라, 내용이 같은 커밋을 새로 만들기 때문입니다. 즉, 원격 브랜치를 베이스로 작업하고 있던 동료의 커밋 로그를 깨뜨리거나 작업본을 날려먹을 수도 있으니 항상 주의해야 합니다.

<p align="center">
  <img width='480' src="./images/rebase/rebase-continue.webp">
</p>

두 커밋이 합쳐져 커밋 로그가 깨끗하게 정리된 것을 볼 수 있습니다.

<p align="center">
  <img width='480' src="./images/rebase/rebase-finish.webp">
</p>

## 참고

- [Git Docs](https://git-scm.com/doc)
- ['Outsider'님의 Merge vs Rebase vs Squash](https://blog.outsider.ne.kr/1704?category=0)
- ['재그지그'님의 Git rebase with interactive](https://wormwlrm.github.io/2020/09/03/Git-rebase-with-interactive-option.html#squash-fixup)
