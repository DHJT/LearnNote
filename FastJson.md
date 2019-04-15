# FastJson
<!-- @author DHJT 2018-12-19 -->

## 过滤字段
1、在对象对应字段前面加`transient`，表示该字段不用序列化，即在生成json的时候就不会包含该字段了。
比如
  private transient String name;  

2、在对象响应字段前加注解，这样生成的json也不包含该字段。
``` java
@JSONField(serialize = false)
private String name;
```

3.指定的字段才能显示出来
``` java
SimplePropertyPreFilter filter = new SimplePropertyPreFilter(MpBannerEntity.class, "title", "thumbUrl", "url");
JSONObject.toJSONString(要过滤的对象, filter);
```

4:过滤指定字段
``` java
final String[] arr = new String[] { "ticketNo", "status", "updateTime", "createTime" };
PropertyFilter propertyFilter = new PropertyFilter() {
    public boolean apply(Object object, String name, Object value) {
        for (String string : arr) {
            if (name.equalsIgnoreCase(string)) {
                return false;// 过滤掉
            }
        }
        return true;// 不过滤
    }
};
JSON.toJSONString(user, propertyFilter);
```