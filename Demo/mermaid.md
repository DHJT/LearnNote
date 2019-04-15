graph TB
    sq[Square shape] --> ci((Circle shape))

    subgraph A subgraph
        di{Diamond with  line break} -.-> ro(Rounded)
        di==>ro2(Rounded square shape)
    end

    e --> od3>Really long text with linebreak<br>in an Odd shape]

    cyr[Cyrillic]-->cyr2((Circle shape Начало));

    classDef green fill:#9f6,stroke:#333,stroke-width:2px;
    classDef orange fill:#f96,stroke:#333,stroke-width:4px;
    class sq,e green
    class di orange
