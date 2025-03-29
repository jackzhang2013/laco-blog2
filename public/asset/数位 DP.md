## 思想

---

数位，代表权值和下标
记录完整数位

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