#!/usr/local/bin/python3
# -*- coding:utf-8 -*-  
import git
import os, subprocess
import shutil

result = os.popen("echo ~/go")
res = result.read()
go_path = res.splitlines()[0]
go_path_src = go_path + "/src"
os.chdir(go_path_src)

# 定义插件字典
entries = {
    "gocode":"github.com/mdempsky/gocode",
    "gopkgs":"github.com/uudashr/gopkgs",
    "go-outline":"github.com/ramya-rao-a/go-outline",
    "go-symbols":"github.com/acroca/go-symbols",
    "guru":"golang.org/x/tools/cmd/guru",
    "gorename":"golang.org/x/tools/cmd/gorename",
    "dlv":"github.com/derekparker/delve/cmd/dlv",
    "gocode-gomod":"github.com/stamblerre/gocode",
    "godef":"github.com/rogpeppe/godef",
    "godef-gomod":"github.com/ianthehat/godef",
    "goreturns":"github.com/sqs/goreturns",
    "golint":"golang.org/x/lint/golint"
}

for name,path in entries.items():
    # 对路径进行分片
    dirs = path.split('/')
    git_name = dirs[-1]
    dirs = dirs[0:-1]
    root = go_path_src
    os.chdir(root)
    for dir_name in dirs:
        dest = root+"/"+dir_name
        if not os.path.exists(dest):
            os.mkdir(dir_name)
            print('mkdir '+ dest)        
        root = dest
        print("enter dir "+ os.getcwd())
        os.chdir(root)
    
    print("current dir "+ os.getcwd())
    clone_path = os.getcwd()+git_name
    if os.path.exists(clone_path):
        shutil.rmtree(clone_path)

    print("git clone "+"https://"+path+".git")
    repo = git.Repo.clone_from("https://"+path+".git",git_name)
    

   