# subversion
SVN服务器有2种运行方式：独立服务器和借助Apache。2种方式各有利弊。
SVN存储版本数据也有2种方式：Berkeley DB和FSFS。因为Berkeley DB方式在服务器中断时，有可能锁住数据，所以还是FSFS方式更安全一点。