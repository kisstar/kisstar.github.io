import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.e9126b17.js";const m=JSON.parse('{"title":"C++ 默认提供和调用的函数","description":"","frontmatter":{},"headers":[],"relativePath":"effective-cpp/05-default-fun.md","filePath":"effective-cpp/05-default-fun.md","lastUpdated":1713013087000}'),p={name:"effective-cpp/05-default-fun.md"},o=l(`<h1 id="c-默认提供和调用的函数" tabindex="-1">C++ 默认提供和调用的函数 <a class="header-anchor" href="#c-默认提供和调用的函数" aria-label="Permalink to &quot;C++ 默认提供和调用的函数&quot;">​</a></h1><p>当声明一个类时，编译器就会为它声明一个 copy 构造函数、一个 copy assignment 操作符和一个析构函数。此外如果你没有声明任何构造函数，编译器也会为你声明一个 default 构造函数。</p><blockquote><p>所有这些自动生成的函数都是 public 且 inline 的。</p><p>编译器产出的析构函数是个 non-virtual，除非这个 class 的 base class 自身声明有 virtual 析构函数（此时函数的虚属性主要来自 base class)。</p></blockquote><p>其中 copy 构造函数和 copy assignment 操作符，编译器创建的版本只是单纯地将来源对象的每一个 non-static 成员变量拷贝到目标对象。</p><p>当对象包含引用成员时或者常量成员时，copy assignment 操作符的行为是未定义的：</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">template</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Namedobject</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#F97583;">public:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Namedobject</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::</span><span style="color:#B392F0;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) : </span><span style="color:#B392F0;">namevalue</span><span style="color:#E1E4E8;">(name) {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">private:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">namevalue;</span></span>
<span class="line"><span style="color:#6A737D;">    // const T objectvalue;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string </span><span style="color:#B392F0;">name1</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name1&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string </span><span style="color:#B392F0;">name2</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name2&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Namedobject</span><span style="color:#F97583;">&lt;int&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">nb1</span><span style="color:#E1E4E8;">(name1, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    Namedobject</span><span style="color:#F97583;">&lt;int&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">nb2</span><span style="color:#E1E4E8;">(nb1);</span></span>
<span class="line"><span style="color:#E1E4E8;">    nb1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nb2;</span><span style="color:#6A737D;"> // error</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">template</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Namedobject</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">public:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Namedobject</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::</span><span style="color:#6F42C1;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#E36209;">name</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) : </span><span style="color:#6F42C1;">namevalue</span><span style="color:#24292E;">(name) {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">private:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">namevalue;</span></span>
<span class="line"><span style="color:#6A737D;">    // const T objectvalue;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string </span><span style="color:#6F42C1;">name1</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name1&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string </span><span style="color:#6F42C1;">name2</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name2&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Namedobject</span><span style="color:#D73A49;">&lt;int&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">nb1</span><span style="color:#24292E;">(name1, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    Namedobject</span><span style="color:#D73A49;">&lt;int&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">nb2</span><span style="color:#24292E;">(nb1);</span></span>
<span class="line"><span style="color:#24292E;">    nb1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nb2;</span><span style="color:#6A737D;"> // error</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><ul><li>编译器可以暗自为 class 创建 default 构造函数、copy 构造函数、copy assignment 操作符，以及析构函数。</li><li>在一个“内含 reference 成员”或内涵“const 成员”的 class 内支持赋值操作，你必须自己定义 copy assignment 操作符。</li><li>如果某个 base classes 将 copy assignment 操作符声明为 private，编译器将拒绝为其 derived classes 生成一个 copy assignment 操作符。</li></ul>`,8),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{m as __pageData,u as default};