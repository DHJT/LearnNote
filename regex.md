# Regular Expression，在代码中常简写为regex、regexp或RE
``` java
    // 判断String 串 是否为只包含字母数字
    public static boolean isLetterDigit(String str) {
        String regex = "^[a-z0-9A-Z]+$";
        return str.matches(regex);
    }
```
