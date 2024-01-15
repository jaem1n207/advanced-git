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
- [Git Reset](#git-reset)
- [마지막 커밋을 수정하는 방법](#%EB%A7%88%EC%A7%80%EB%A7%89-%EC%BB%A4%EB%B0%8B%EC%9D%84-%EC%88%98%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
- [여러 개의 커밋 메시지를 수정하고 싶은 경우](#%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A5%BC-%EC%88%98%EC%A0%95%ED%95%98%EA%B3%A0-%EC%8B%B6%EC%9D%80-%EA%B2%BD%EC%9A%B0)
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

작동 원리 등 자세한 내용은 [Git 공식 문서](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0)에서 확인해주세요.

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
git add file1
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

`A 변수명 수정` - `A 로직 수정` - `파일명 수정` 순으로 작업을 하다가 A 변수에 더 어울리는 이름이 생각 나 커밋을 추가했습니다. 그럼 `A 변수명 수정` - `A 로직 수정` - `파일명 수정` - `A 변수명 수정` 형태로 커밋 로그가 복잡해집니다. 이때 interactive rebase 를 사용해 순서를 바꾸고 커밋을 합쳐 `A 변수명 수정` - `A 로직 수정` - `파일명 수정` 처럼 만들 수 있습니다.

```bash

```

보통 하나의 PR에 몇 시간에서 며칠이 걸리기도 합니다. 이렇게 복잡한 로그가 아닌 순서대로 커밋 로그를 만들어 두면 나중에 이 로그를 보며 작업의 흐름을 쉽게 이해할 수 있습니다. 덤으로 코드 리뷰를 하는 개발자 입장에서 로그를 보며 제대로 수정되었는지 확인하기 쉬워지는 효과도 있습니다.

## Merge와 Rebase

`merge`와 `rebase` 명령은 서로 다른 브랜치의 커밋을 합칩니다.

## 상황에 맞게 사용하는 Merge, Rebase, Squash

> [!NOTE]  
> **스쿼시**는 여러 개의 커밋 기록을 하나의 커밋 기록으로 합치는 방법입니다. 주로 팀원들과 PR에서 변경 사항에 대해 논의하기 전에 커밋 기록을 정리하고 단순화하는 데 사용합니다.
