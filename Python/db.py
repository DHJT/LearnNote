#!D:\ProgramFiles\Python36
# -*- coding: UTF-8 -*-
# # 文件名：E:\Note-DH\DH-Backup\learn note\Python\testPython.py
import sys
import pymysql

# 连接配置信息
config = {
    'host':'127.0.0.1',
    'port':3306,
    'user':'root',
    'password':'',
    'db':'liblog',
    'charset':'utf8mb4',
    'cursorclass':pymysql.cursors.DictCursor,
}
# 打开数据库连接
db = pymysql.connect(**config)

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 查询语句
sql = "SELECT * FROM li_user"
try:
    # 执行SQL语句
    cursor.execute(sql)
    # 获取所有记录列表
    results = cursor.fetchall()
    print ("Database version : %s " % results)
    for row in results:
        fname = row['id']
        lname = row['name']
        age = row['nickname']
        sex = row['password']
        income = row['email']
        # 打印结果
        print ("fname=%d,lname=%s,age=%s,sex=%s,income=%s" % (fname, lname, age, sex, income ))
    # 使用 execute()  方法执行 SQL 查询
#     cursor.execute("SELECT VERSION()")

    # 使用 fetchone() 方法获取单条数据.
#     data = cursor.fetchone()

#     print ("Database version : %s " % data)
except:
    print ("Error: unable to fetch data")
    print("Unexpected error:", sys.exc_info()[0])
    # 发生错误时回滚
    db.rollback()
finally:
    # 关闭数据库连接
    db.close()