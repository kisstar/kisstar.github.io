import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.eecc699f.js";const F=JSON.parse('{"title":"确定对象被初始化","description":"","frontmatter":{},"headers":[],"relativePath":"effective-cpp/04-init-obj.md","filePath":"effective-cpp/04-init-obj.md"}'),p={name:"effective-cpp/04-init-obj.md"},o=l(`<h1 id="确定对象被初始化" tabindex="-1">确定对象被初始化 <a class="header-anchor" href="#确定对象被初始化" aria-label="Permalink to &quot;确定对象被初始化&quot;">​</a></h1><p>永远在使用对象之前先将它初始化。</p><p>对于无任何成员的内置类型，你必须手工完成此事。至于内置类型以外的任何其他东西，确保每一个构造函数都将对象的每一个成员初始化。</p><h2 id="初始化和赋值" tabindex="-1">初始化和赋值 <a class="header-anchor" href="#初始化和赋值" aria-label="Permalink to &quot;初始化和赋值&quot;">​</a></h2><p>需要注意的是不要混淆初始化与赋值：</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Animal</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#F97583;">public:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::</span><span style="color:#B392F0;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#FFAB70;">animal_name</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">private:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string name;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;">::</span><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">animal_name)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">-&gt;name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> animal_name;</span><span style="color:#6A737D;"> // 此为赋值而非初始化</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Animal</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">public:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::</span><span style="color:#6F42C1;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#E36209;">animal_name</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">private:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string name;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;">::</span><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">animal_name)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">-&gt;name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> animal_name;</span><span style="color:#6A737D;"> // 此为赋值而非初始化</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>对象的成员变量的初始化动作发生在进入构造函数本体之前，较佳写法是使用所谓的 member initialization list(成 员初值列)替换赋值动作：</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;">::</span><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::string </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">animal_name) : </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">(animal_name)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;">::</span><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::string </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">animal_name) : </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">(animal_name)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>改进版的 name 直接使用 animal_name 作为初值进行 copy 改造。</p><h2 id="non-local-static-对象" tabindex="-1">non-local static 对象 <a class="header-anchor" href="#non-local-static-对象" aria-label="Permalink to &quot;non-local static 对象&quot;">​</a></h2><p>函数内的 static 对象称为 local static 对象（因为它们对函数而言是 local)，其他 static 对象称为 non-local static 对象。</p><p>所谓编译单元是指产出单一目标文件的那些源码。基本上它是单一源码文件加上其所含入的头文件。</p><p>如果某编译单元内的某个 non-local static 对象的初始化动作使用了另一编译单元内的某个 non-local static 对象，它所用到的这个对象可能尚未被初始化，因为 C++ 对“定义于不同编译单元内的 non-local static 对象”的初始化次序并无明确定义。</p><p>为了解决这个问题我们结合 Singletons 模式以函数调用的方式替换直接访问 non-local static 对象：</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// reference-returning 函数</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileSystem</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#B392F0;">FileSystem</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#B392F0;">tfs</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> FileSystem fs;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> fs;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// reference-returning 函数</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileSystem</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#6F42C1;">FileSystem</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#6F42C1;">tfs</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> FileSystem fs;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> fs;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>现在，在我们首次调用 tfs() 函数时将会初始化 fs 对象，如果你从未调用 non-local static 对象的“仿真函数”，就绝不会引发构造和 析构成本。</p><blockquote><p>任何一种 non-const static 对象，不论它是 local 或 non-local,在多线程环境下“等待某事发生”都会有麻烦。</p><p>处理这个麻烦的一种做法是：在程序的单线程启动阶段手工调用所有 reference-returning 函数，这可消除与初始化有关的“竞速形势”。</p></blockquote><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><ul><li>内置型对象进行手工初始化，因为 C++不保证初始化它们。</li><li>构造函数最好使用成员初值列，而不要在构造函数本体内使用赋值操作。初值列列出的成员变量，其排列次序应该和它们在 class 中的声明次序相同。</li><li>为免除“跨编译单元之初始化次序”问题，请以 local static 对象替换 non-local static 对象。</li></ul>`,19),e=[o];function c(t,r,i,E,y,m){return a(),n("div",null,e)}const h=s(p,[["render",c]]);export{F as __pageData,h as default};