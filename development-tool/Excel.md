# Excel的一些使用技巧

©大海景天 2017-08-30

- 合并当前目录下所有工作簿的全部工作表()
```vbs
Sub 合并当前目录下所有工作簿的全部工作表()
Dim MyPath, MyName, AWbName
Dim Wb As Workbook, WbN As String
Dim G As Long
Dim Num As Long
Dim BOX As String
Application.ScreenUpdating = False
MyPath = ActiveWorkbook.Path
MyName = Dir(MyPath & "\" & "*.xls")
AWbName = ActiveWorkbook.Name
Num = 0
Do While MyName <> ""
If MyName <> AWbName Then
Set Wb = Workbooks.Open(MyPath & "\" & MyName)
Num = Num + 1
With Workbooks(1).ActiveSheet
.Cells(.Range("A65536").End(xlUp).Row + 1, 1) = Left(MyName, Len(MyName) - 4)
For G = 1 To Sheets.Count
Wb.Sheets(G).UsedRange.Copy .Cells(.Range("A65536").End(xlUp).Row + 1, 1)
Next
WbN = WbN & Chr(13) & Wb.Name
Wb.Close False
End With
End If
MyName = Dir
Loop
Range("A1").Select
Application.ScreenUpdating = True
MsgBox "共合并了" & Num & "个工作薄下的全部工作表。如下：" & Chr(13) & WbN, vbInformation, "提示"
End Sub
```
- 如何批量的CSV格式excel报表批量转换成xlsx格式工作表
在批量CSV文件夹中新建一个EXCEL文件并打开，在打开的文件中sheet文件名上单击右键选查看代码

VBA通用窗体中输入下面代码：
``` vbs
Sub 转换()
Application.ScreenUpdating = False
pth = ThisWorkbook.Path & "\"
flnm = Dir(pth & "*.csv")
Do While Len(flnm) > 0
    With Workbooks.Open(pth & flnm, ReadOnly:=True)
        .SaveAs Replace(flnm, ".csv", ""), IIf(Application.Version >= 12, xlWorkbookDefault, xlWorkbookNormal)
        .Close
    End With
    flnm = Dir
Loop
End Sub
```
再点击工具栏中的运行-运行子过程/用户窗体）新的表格会自动保存
### 公式
```vbs
="INSERT INTO logistic_basestation (physicalbasestation_id,logisticbasestation_name,basestation_type,project) values('"&A2&"','"&B2&"','"&C2&"','"&D2&"');"
```