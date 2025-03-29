## 算法

---

[[数位 DP]]

## 过程

---

```cpp
int dfs(x, tag, flag):
 if x -> 边界:
  return tag
 if flag = 0 且 f 存在:
  return f
 maxcnt = 9
 if flag:
  maxcnt = a[x]
 for 0 ~ maxcnt:
  if ...:
   dfs
```

### 边界

`x == 0`
取完

### $f$数组

$f_{i,j}$ = 取 $i$ 位，$tag$ 为 $j$ 的答案

如果无限制则记录

### 分类

1. `i == 9 && tag == 1`
 那么`dfs(x - 1, 2, flag && i == maxcnt)`
2. `i == 4`
 先定义`tmp`为下一个`tag`

   - 当前`tag`为$2$
     `tmp = 2`
   - 否则
     `tmp = 1`
    最后再`dfs(x - 1, tmp, flag && i == maxcnt)`

3. `i == 其他数字`
 直接`dfs(x - 1, tag, flag && i == maxcnt)`
