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

- [머지와 리베이스](#%EB%A8%B8%EC%A7%80%EC%99%80-%EB%A6%AC%EB%B2%A0%EC%9D%B4%EC%8A%A4)
- [상황에 맞게 사용하는 머지, 리베이스, 스쿼시](#%EC%83%81%ED%99%A9%EC%97%90-%EB%A7%9E%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%A8%B8%EC%A7%80-%EB%A6%AC%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%8A%A4%EC%BF%BC%EC%8B%9C)

</details>
<!-- CUSTOM-AUTO-GENERATED-CONTENT:END -->

## 머지와 리베이스

`merge`와 `rebase` 명령은 서로 다른 브랜치의 커밋을 합칩니다.

## 상황에 맞게 사용하는 머지, 리베이스, 스쿼시

> [!NOTE]  
> **스쿼시**는 여러 개의 커밋 기록을 하나의 커밋 기록으로 합치는 방법입니다. 주로 팀원들과 PR에서 변경 사항에 대해 논의하기 전에 커밋 기록을 정리하고 단순화하는 데 사용합니다.
