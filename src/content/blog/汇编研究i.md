---
title: "汇编研究I"
pubDate: 2023-09-27 20:29:45
tags:
- Assembly
- Low-level
- C
description: "汇编语言研究"
---

## 源文件
``` c
#include <stdio.h>

int add(int x,int y) {
    return x + y;
}

int main(int argc,char** arg) {
    
    printf("%d + %d = %d",1,2,add(1,2));
    return 0;
}
```

## 汇编
``` asm
.section__TEXT,__text,regular,pure_instructions
.build_version macos, 13, 0sdk_version 13, 3
.globl_add                            ## -- Begin function add
.p2align4, 0x90
_add:                                   ## @add
.cfi_startproc
## %bb.0:
pushq%rbp
.cfi_def_cfa_offset 16
.cfi_offset %rbp, -16
movq%rsp, %rbp
.cfi_def_cfa_register %rbp
movl%edi, -4(%rbp)
movl%esi, -8(%rbp)
movl-4(%rbp), %eax
addl-8(%rbp), %eax
popq%rbp
retq
.cfi_endproc
                                        ## -- End function
.globl_main                           ## -- Begin function main
.p2align4, 0x90
_main:                                  ## @main
.cfi_startproc
## %bb.0:
pushq%rbp
.cfi_def_cfa_offset 16
.cfi_offset %rbp, -16
movq%rsp, %rbp
.cfi_def_cfa_register %rbp
subq$16, %rsp
movl$0, -4(%rbp)
movl%edi, -8(%rbp)
movq%rsi, -16(%rbp)
movl$1, %edi
movl$2, %esi
callq_add
movl%eax, %ecx
leaqL_.str(%rip), %rdi
movl$1, %esi
movl$2, %edx
movb$0, %al
callq_printf
xorl%eax, %eax
addq$16, %rsp
popq%rbp
retq
.cfi_endproc
                                        ## -- End function
.section__TEXT,__cstring,cstring_literals
L_.str:                                 ## @.str
.asciz"%d + %d = %d"

.subsections_via_symbols

```

## 逐行代码解析

1. `.section __TEXT,__text,regular,pure_instructions`: 定义一个新的段（section），名为`__TEXT,__text`，用于存放正文（代码）；`regular`和`pure_instructions`是段的属性，表示该段包含普通的指令集和纯指令（无数据）。

2. `.build_version macos, 13, 0 sdk_version 13, 3`: 声明编译的版本信息，表示此程序的目标操作系统版本为 macOS 13.0，使用的 SDK 版本为 13.3。

3. `.globl _add`: 声明全局符号 `_add`，用于表示函数`add`的入口。

4. `.p2align 4, 0x90`: 确保下一个指令的地址在16字节对齐位置上。

5. `_add:`: 函数`add`的标签，表示函数的入口。

6. `.cfi_startproc`: 声明函数的开始，用于生成调试信息。

7. `pushq %rbp`: 将寄存器`%rbp`的值压入栈中，保存之前的栈帧指针。

8. `.cfi_def_cfa_offset 16`: 定义栈帧指针偏移，将栈帧大小设置为16字节。

9. `.cfi_offset %rbp, -16`: 定义寄存器`%rbp`的位置在栈的偏移量为-16。

10. `movq %rsp, %rbp`: 将当前栈指针`%rsp`的值赋给栈帧指针`%rbp`，建立新的栈帧。

11. `.cfi_def_cfa_register %rbp`: 定义新的栈帧指针寄存器为`%rbp`。

12. `movl %edi, -4(%rbp)`: 将函数的第一个参数（整型）移动到栈帧中的位置，偏移量为-4。

13. `movl %esi, -8(%rbp)`: 将函数的第二个参数（整型）移动到栈帧中的位置，偏移量为-8。

14. `movl -4(%rbp), %eax`: 将栈帧中的第一个参数加载到通用寄存器`%eax`中。

15. `addl -8(%rbp), %eax`: 将栈帧中的第二个参数与`%eax`寄存器的值相加。

16. `popq %rbp`: 弹出保存的栈帧指针。

17. `retq`: 返回函数，将栈帧指针弹出到程序计数器，并跳转到调用函数的位置。

18. `.cfi_endproc`: 声明函数的结束，停止生成调试信息。

19. `.globl _main`: 声明全局符号 `_main`，用于表示函数`main`的入口。

20. `.p2align 4, 0x90`: 确保下一个指令的地址在16字节对齐位置上。

21. `_main:`: 函数`main`的标签，表示函数的入口。

22. `.cfi_startproc`: 声明函数的开始，用于生成调试信息。

23. `pushq %rbp`: 将寄存器`%rbp`的值压入栈中，保存之前的栈帧指针。

24. `.cfi_def_cfa_offset 16`: 定义栈帧指针偏移，将栈帧大小设置为16字节。

25. `.cfi_offset %rbp, -16`: 定义寄存器`%rbp`的位置在栈的偏移量为-16。

26. `movq %rsp, %rbp`: 将当前栈指针`%rsp`的值赋给栈帧指针`%rbp`，建立新的栈帧。

27. `.cfi_def_cfa_register %rbp`: 定义新的栈帧指针寄存器为`%rbp`。

28. `subq $16, %rsp`: 在栈上分配16字节的空间，为本地变量的使用而预留。

29. `movl $0, -4(%rbp)`: 初始化栈帧中的一个本地变量，将值0存储在偏移量为-4的位置。

30. `movl %edi, -8(%rbp)`: 将函数的第一个参数（整型）移动到栈帧中的位置，偏移量为-8。

31. `movq %rsi, -16(%rbp)`: 将函数的第二个参数（整型）移动到栈帧中的位置，偏移量为-16。

32. `movl $1, %edi`: 将值1存储在寄存器`%edi`中，准备作为第一个参数传递给`_add`函数。

33. `movl $2, %esi`: 将值2存储在寄存器`%esi`中，准备作为第二个参数传递给`_add`函数。

34. `callq _add`: 调用函数`_add`，将参数传递给它，并开始执行该函数。

35. `movl %eax, %ecx`: 将`_add`函数的返回值（存储在寄存器`%eax`中）移动到寄存器`%ecx`中，准备作为参数传递给printf函数。

36. `leaq L_.str(%rip), %rdi`: 将字符串L_.str的地址（存储在相对寻址中）加载到寄存器`%rdi`中，作为printf函数的第一个参数。

37. `movl $1, %esi`: 将值1存储在寄存器`%esi`中，准备作为printf函数的第二个参数。

38. `movl $2, %edx`: 将值2存储在寄存器`%edx`中，准备作为printf函数的第三个参数。

39. `movb $0, %al`: 将值0存储在寄存器`%al`中，准备作为printf函数的第四个参数。

40. `callq _printf`: 调用printf函数，将之前准备好的参数传递给它，开始执行打印操作。

41. `xorl %eax, %eax`: 将寄存器`%eax`与自身进行异或操作，将结果存储回`%eax`，相当于将其清零。

42. `addq $16, %rsp`: 释放之前预留的16字节的栈空间。

43. `popq %rbp`: 弹出保存的栈帧指针。

44. `retq`: 返回函数，将栈帧指针弹出到程序计数器，并跳转到程序的结束点。

45. `.cfi_endproc`: 声明函数的结束，停止生成调试信息。

46. `.section __TEXT,__cstring,cstring_literals`: 定义一个新的段（section），名为`__TEXT,__cstring`，用于存放c字符串字面量。

47. `L_.str: .asciz "%d + %d = %d"`: 定义一个c字符串字面量`"%d + %d = %d"`，并使用标签`L_.str`进行引用。

48. `.subsections_via_symbols`: 告诉编译器按照符号（symbol）来生成子段（subsections）。

以上就是汇编代码的逐行解释，希望能帮助你理解代码的功能和执行流程。
