import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.55e55ea0.js";const u=JSON.parse('{"title":"绝不在构造和析构过程中调用虚函数","description":"","frontmatter":{},"headers":[],"relativePath":"09/call/virtual/func.md","filePath":"effective-cpp/09-call-virtual-func.md","lastUpdated":1710571885000}'),p={name:"09/call/virtual/func.md"},o=l(`<h1 id="绝不在构造和析构过程中调用虚函数" tabindex="-1">绝不在构造和析构过程中调用虚函数 <a class="header-anchor" href="#绝不在构造和析构过程中调用虚函数" aria-label="Permalink to &quot;绝不在构造和析构过程中调用虚函数&quot;">​</a></h1><p>不要在构造函数和析构函数期间调用 virtual 函数，因为这样的调用不会带来你预想的结果，就算有你也不会高兴。</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transaction</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#F97583;">public:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Transaction</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">logTransaction</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">virtual</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">logTransaction</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BuyTransaction</span><span style="color:#E1E4E8;"> : </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transaction</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#F97583;">public:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">virtual</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">logTransaction</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">BuyTransaction b;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transaction</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">public:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Transaction</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">logTransaction</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">virtual</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">logTransaction</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BuyTransaction</span><span style="color:#24292E;"> : </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transaction</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">public:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">virtual</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">logTransaction</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">const</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">BuyTransaction b;</span></span></code></pre></div><p>由于 base class 构造期间 virtual 函数绝不会下降到 derived classes 阶层。</p><p>所以，Transaction 构造函数的最后一行调用 virtual 函数 logTransaction，此时被调用的 logTransaction 是 Transaction 内的版本，不是 BuyTransaction 内的版本，即使目前即将建立的对象类型是 BuyTransaction。</p><p>事实上，在 derived class 对象的 base class 构造期间，对象的类型是 base class 而不是 derived class。</p><p>同理，一旦 derived class 析构函数开始执行，对象内的 derived class 成员变量便呈现未定义值，所以 C++ 视它们仿佛不再存在。</p><p>进入 base class 析构函数后对象就成为一个 base class 对象，而 C++ 的任何部分包括 virtual 函数、dynamic casts 等等也就那么看待它。</p><p>针对这种情况（无法使用 virtual 函数从 base classes 向下调用），一些替代方案在构造期间，可以藉由“令 derived classes 将必要的构造信息向上传递至 base class 构造函数”替换之而加以弥补：</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transaction</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#F97583;">public:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">explicit</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transaction</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;"> : </span><span style="color:#B392F0;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#FFAB70;">logInfo</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">logTransaction</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;">::</span><span style="color:#B392F0;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#FFAB70;">logInfo</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;">;</span><span style="color:#6A737D;"> // 如今是个 non-virtual 函数</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Transaction</span><span style="color:#E1E4E8;"> ::</span><span style="color:#B392F0;">Transaction</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;"> ::</span><span style="color:#B392F0;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#FFAB70;">logInfo</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">logTransaction</span><span style="color:#E1E4E8;">(logInfo);</span><span style="color:#6A737D;"> // 如今是个 non-virtual 调用</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BuyTransaction</span><span style="color:#E1E4E8;"> : </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transaction</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#F97583;">public:</span></span>
<span class="line"><span style="color:#6A737D;">    // 将 log 信息传给 base class 构造函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">BuyTransaction</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">parameters</span><span style="color:#E1E4E8;">) : </span><span style="color:#B392F0;">Transaction</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">createLogString</span><span style="color:#E1E4E8;">(parameters))</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">private:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">std</span><span style="color:#E1E4E8;"> ::</span><span style="color:#B392F0;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createLogString</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">parameters</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transaction</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">public:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">explicit</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transaction</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;"> : </span><span style="color:#6F42C1;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#E36209;">logInfo</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">logTransaction</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;">::</span><span style="color:#6F42C1;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#E36209;">logInfo</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">const</span><span style="color:#24292E;">;</span><span style="color:#6A737D;"> // 如今是个 non-virtual 函数</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Transaction</span><span style="color:#24292E;"> ::</span><span style="color:#6F42C1;">Transaction</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;"> ::</span><span style="color:#6F42C1;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#E36209;">logInfo</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">logTransaction</span><span style="color:#24292E;">(logInfo);</span><span style="color:#6A737D;"> // 如今是个 non-virtual 调用</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BuyTransaction</span><span style="color:#24292E;"> : </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transaction</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#D73A49;">public:</span></span>
<span class="line"><span style="color:#6A737D;">    // 将 log 信息传给 base class 构造函数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">BuyTransaction</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">parameters</span><span style="color:#24292E;">) : </span><span style="color:#6F42C1;">Transaction</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">createLogString</span><span style="color:#24292E;">(parameters))</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">private:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">std</span><span style="color:#24292E;"> ::</span><span style="color:#6F42C1;">string</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createLogString</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">parameters</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>注意此处的静态函数，比起在成员初值列内给予 base class 所需数据，利用辅助函数创建一个值传给 base class 构造函数往往比较方便（也比较可读）。</p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><ul><li>在构造和析构期间不要调用 virtual 函数，因为这类调用从不下降至 derived class（比起当前执行构造函数和析构函数的那层）。</li></ul>`,13),c=[o];function e(t,r,E,y,i,F){return a(),n("div",null,c)}const g=s(p,[["render",e]]);export{u as __pageData,g as default};
