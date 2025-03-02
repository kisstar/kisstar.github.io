import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.55e55ea0.js";const p="/images/git/git-lint.png",u=JSON.parse('{"title":"Git Commit 规范","description":"","frontmatter":{"thumbnail":"/images/git/git-lint.png","title":"Git Commit 规范","summary":"每一条提交信息都应该是有意义的，遵循规范的友好提交信息更能体现出它的价值，包括但不仅包括高可读性、方便分类和利于问题追溯。","author":"Kisstar","location":"北京","date":"2021-06-14T00:00:00.000Z","categoryKeys":["freebie"],"tagKeys":["git"],"outline":"deep"},"headers":[],"relativePath":"2021/06/14/commitlint.md","filePath":"posts/git/2021-06-14-commitlint.md","lastUpdated":1700905430000}'),o={name:"2021/06/14/commitlint.md"},e=l('<p><img style="width:100%;height:350px;box-shadow:rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;" src="'+p+`" alt="git"></p><p>每一条提交信息都应该是有意义的，遵循规范的友好提交信息更能体现出它的价值。</p><ul><li>高可读性: 利于 CR，Reviewer 可以明确本次提交的目的；</li><li>方便分类: 自动生成变更日志。对于一些 SDK 而言，可以查看每次版本升级的改动点；</li><li>利于追溯: 定位问题时可以快速确定范围（代码、影响）。</li></ul><h2 id="conventional-commits" tabindex="-1">Conventional Commits <a class="header-anchor" href="#conventional-commits" aria-label="Permalink to &quot;Conventional Commits&quot;">​</a></h2><p>社区有多种 Commit message 的写法规范，其中 <a href="https://conventionalcommits.org/" target="_blank" rel="noreferrer">Conventional Commits 规范</a> 是目前使用比较广的，它的各项规定也比较合理和系统化。</p><p>在该规范下，提交消息的结构应如下所示：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">type</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">[optional scope]: </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">description</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[optional body]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[optional footer(s)]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">type</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">[optional scope]: </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">description</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[optional body]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[optional footer(s)]</span></span></code></pre></div><p><code>type</code> 是必须的，指定了本次提交的类型，用于向库的使用者传达意图：</p><ul><li>feat: 添加新功能。</li><li>fix: 修复问题。</li><li>docs: 更新文档。</li><li>style: 代码格式化相关，与功能无关的改动。</li><li>chore: 改变构建流程，依赖库，工具等。</li><li>build：构建项目。</li><li>perf：性能优化。</li><li>refactor：重构代码。</li><li>ci：CI 相关修改。</li><li>test：测试用例相关修改。</li></ul><p><code>scope</code> 是可选的，用以描述本次修改涉及的范围。范围必须由一个名词组成。</p><p><code>description</code> 是必须的，而且必须紧跟在冒号后面，并在类型/作用域前缀后面加空格，作为代码更改的简短摘要。</p><p><code>body</code> 是可选的，由任意数量的换行分隔段落组成，提供有关代码更改的附加上下文信息。</p><p><code>footer</code> 也是可选的，通常用来关联 ISSUE 和描述是否是 Break Chage 等。</p><h2 id="commitlint" tabindex="-1">Commitlint <a class="header-anchor" href="#commitlint" aria-label="Permalink to &quot;Commitlint&quot;">​</a></h2><p>规范已经有了，接下来需要保证大家能够遵守规范。和 ESLint 一样，Commitlint 自身提供了检测的功能和一些最基础的规则。</p><p>按照官网的介绍，Commitlint 会检查提交消息是否符合上面我们介绍的规范。要在项目中使用 Commitlint 需要先按照相关的依赖：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># @commitlint/config-conventional 遵循了 Conventional Commits 规范</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@commitlint/cli</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@commitlint/config-conventional</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># @commitlint/config-conventional 遵循了 Conventional Commits 规范</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@commitlint/cli</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@commitlint/config-conventional</span></span></code></pre></div><p>然后，配置应该使用的校验规则：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;module.exports = {extends: [&#39;@commitlint/config-conventional&#39;]};&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">commitlint.config.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;module.exports = {extends: [&#39;@commitlint/config-conventional&#39;]};&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">commitlint.config.js</span></span></code></pre></div><p>更进一步，我们还可以配合 Git 的钩子进行自动校验：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Install Husky v6</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">husky</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Activate hooks</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">husky</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Add hook</span></span>
<span class="line"><span style="color:#B392F0;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">husky</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.husky/commit-msg</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;npx --no-install commitlint --edit &quot;$1&quot;&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Install Husky v6</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">husky</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Activate hooks</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">husky</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Add hook</span></span>
<span class="line"><span style="color:#6F42C1;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">husky</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.husky/commit-msg</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;npx --no-install commitlint --edit &quot;$1&quot;&#39;</span></span></code></pre></div><p>现在，规范终于可以落地了。</p><h2 id="adapter" tabindex="-1">Adapter <a class="header-anchor" href="#adapter" aria-label="Permalink to &quot;Adapter&quot;">​</a></h2><p>刚开始使用的时候，我们对提交规范可能会比较陌生，不知道存在哪些选项，又或者应该怎样选择，因此交互式的提交方式是有必要的。</p><p>官方提供了 <code>@commitlint/prompt-cli</code> 来帮助快速编写提交消息，并确保它们遵守在配置文件中配置的提交约定。</p><p>由于其交互模式差强人意，人们使用更多的提交工具是 Commitizen，当你使用它进行提交时系统也将提示你需要填写的所有必需提交字段。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 安装</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">commitizen</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 安装</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">commitizen</span></span></code></pre></div><p>它提供了一个 <code>git-cz</code> 命令，用于代替 <code>git commit</code> 进行提交：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;commit&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如果你没有任何配置那么它和普通的提交方式一样，而当你通过配置指定 Adapter 后就可以进行交互式的提交。</p><p>适配器 <code>@commitlint/cz-commitlint</code> 可以让 Commitizen 和 Commitlint 协同工作，将提交交给前者处理，后者负责进行校验。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 安装</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@commitlint/cz-commitlint</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 安装</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@commitlint/cz-commitlint</span></span></code></pre></div><p>然后，配置交互式的方式：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;config&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;commitizen&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;@commitlint/cz-commitlint&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;config&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;commitizen&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;@commitlint/cz-commitlint&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>目前，应该已经满足我们在个人开发时的需要了。</p><h2 id="自定义规范" tabindex="-1">自定义规范 <a class="header-anchor" href="#自定义规范" aria-label="Permalink to &quot;自定义规范&quot;">​</a></h2><p>如果你觉得其中一些规则并不合需求，你也可以根据需要进行自定义，在一些团队协同中，这可能是比较常见的需求。</p><p>对于 Commitlint 默认支持的规则，你可以在配置文件（./commitlint.config.js）的 <code>rules</code> 字段进行配置。配置项由名称和配置数组组成，配置数组的项包含：</p><ul><li>Level: 0 - 禁用，1 - 警告，2 - 错误。</li><li>Applicable: always|never，never 表示反转规则。</li><li>Value: 用于此规则的值。</li></ul><p>具体在配置时支持以下几种方式：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Plain array</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">rules</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;header-max-length&#39;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;always&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">72</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Function returning array</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">rules</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;header-max-length&#39;</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;always&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">72</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Async function returning array</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">rules</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;header-max-length&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;always&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">72</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Function returning a promise resolving to array</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">rules</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;header-max-length&#39;</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">([</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;always&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">72</span><span style="color:#E1E4E8;">]),</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Plain array</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">rules</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;header-max-length&#39;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;always&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">72</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Function returning array</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">rules</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;header-max-length&#39;</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;always&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">72</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Async function returning array</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">rules</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;header-max-length&#39;</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;always&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">72</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Function returning a promise resolving to array</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">rules</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;header-max-length&#39;</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">([</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;always&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">72</span><span style="color:#24292E;">]),</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>你可以在<a href="https://commitlint.js.org/#/reference-rules" target="_blank" rel="noreferrer">这里</a>看到所有默认支持的配置项。</p><p>另外，每个插件可以导出一个包含额外规则的 <code>rules</code> 对象，其中 <code>key</code> 为规则的名称、值为校验函数。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  rules: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;dollar-sign&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">parsed</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">when</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// rule implementation ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  rules: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;dollar-sign&#39;</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">parsed</span><span style="color:#24292E;">, </span><span style="color:#E36209;">when</span><span style="color:#24292E;">, </span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// rule implementation ...</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>使用时，在配置文件中通过 <code>extends</code> 字段进行引用，然后同样按照上面的配置方式进行配置。</p><h2 id="自定义-adapter" tabindex="-1">自定义 Adapter <a class="header-anchor" href="#自定义-adapter" aria-label="Permalink to &quot;自定义 Adapter&quot;">​</a></h2><p>当你的规范改变后，之前的 Adapter 可能就无法适配了。此时你可以通过 <code>prompt</code> 字段对交互提示的内容进行调整。</p><p>在该字段中主要包括 <code>messages</code> 和 <code>questions</code> 两部分，前者主要是一些提示信息，包括最大和最小长度的限制。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  prompt: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    messages: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      skip: </span><span style="color:#9ECBFF;">&#39;(press enter to skip)&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 提示如何跳过</span></span>
<span class="line"><span style="color:#E1E4E8;">      max: </span><span style="color:#9ECBFF;">&#39;upper %d chars&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 提示最大字符数</span></span>
<span class="line"><span style="color:#E1E4E8;">      min: </span><span style="color:#9ECBFF;">&#39;%d chars at least&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 提示最小字符数</span></span>
<span class="line"><span style="color:#E1E4E8;">      emptyWarning: </span><span style="color:#9ECBFF;">&#39;can not be empty&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 字段不能为空</span></span>
<span class="line"><span style="color:#E1E4E8;">      upperLimitWarning: </span><span style="color:#9ECBFF;">&#39;over limit&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 超过字符限制</span></span>
<span class="line"><span style="color:#E1E4E8;">      lowerLimitWarning: </span><span style="color:#9ECBFF;">&#39;below limit&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 字符数小于下限</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  prompt: {</span></span>
<span class="line"><span style="color:#24292E;">    messages: {</span></span>
<span class="line"><span style="color:#24292E;">      skip: </span><span style="color:#032F62;">&#39;(press enter to skip)&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 提示如何跳过</span></span>
<span class="line"><span style="color:#24292E;">      max: </span><span style="color:#032F62;">&#39;upper %d chars&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 提示最大字符数</span></span>
<span class="line"><span style="color:#24292E;">      min: </span><span style="color:#032F62;">&#39;%d chars at least&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 提示最小字符数</span></span>
<span class="line"><span style="color:#24292E;">      emptyWarning: </span><span style="color:#032F62;">&#39;can not be empty&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 字段不能为空</span></span>
<span class="line"><span style="color:#24292E;">      upperLimitWarning: </span><span style="color:#032F62;">&#39;over limit&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 超过字符限制</span></span>
<span class="line"><span style="color:#24292E;">      lowerLimitWarning: </span><span style="color:#032F62;">&#39;below limit&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 字符数小于下限</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>后者则是针对各个块的问题描述，通过 <code>enum</code> 字段还可以设置可选列表：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  prompt: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    questions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        description: </span><span style="color:#9ECBFF;">&quot;Select the type of change that you&#39;re committing&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        enum: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          feat: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            description: </span><span style="color:#9ECBFF;">&#39;A new feature&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            title: </span><span style="color:#9ECBFF;">&#39;Features&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            emoji: </span><span style="color:#9ECBFF;">&#39;✨&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      scope: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        description:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;What is the scope of this change (e.g. component or file name)&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  prompt: {</span></span>
<span class="line"><span style="color:#24292E;">    questions: {</span></span>
<span class="line"><span style="color:#24292E;">      type: {</span></span>
<span class="line"><span style="color:#24292E;">        description: </span><span style="color:#032F62;">&quot;Select the type of change that you&#39;re committing&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        enum: {</span></span>
<span class="line"><span style="color:#24292E;">          feat: {</span></span>
<span class="line"><span style="color:#24292E;">            description: </span><span style="color:#032F62;">&#39;A new feature&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            title: </span><span style="color:#032F62;">&#39;Features&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            emoji: </span><span style="color:#032F62;">&#39;✨&#39;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      scope: {</span></span>
<span class="line"><span style="color:#24292E;">        description:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;What is the scope of this change (e.g. component or file name)&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>你可以在<a href="https://commitlint.js.org/#/reference-prompt" target="_blank" rel="noreferrer">这里</a>查看到更多相关信息。</p><h2 id="其它配置" tabindex="-1">其它配置 <a class="header-anchor" href="#其它配置" aria-label="Permalink to &quot;其它配置&quot;">​</a></h2><p>除了上面提到了一些配置项外，你还可以针对解析器等做进一步的配置：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Configuration</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Resolve and load @commitlint/config-conventional from node_modules.</span></span>
<span class="line"><span style="color:#6A737D;">   * Referenced packages must be installed</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  extends: [</span><span style="color:#9ECBFF;">&#39;@commitlint/config-conventional&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Resolve and load conventional-changelog-atom from node_modules.</span></span>
<span class="line"><span style="color:#6A737D;">   * Referenced packages must be installed</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  parserPreset: </span><span style="color:#9ECBFF;">&#39;conventional-changelog-atom&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Resolve and load @commitlint/format from node_modules.</span></span>
<span class="line"><span style="color:#6A737D;">   * Referenced package must be installed</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  formatter: </span><span style="color:#9ECBFF;">&#39;@commitlint/format&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Functions that return true if commitlint should ignore the given message.</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  ignores: [</span><span style="color:#FFAB70;">commit</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> commit </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Whether commitlint uses the default ignore rules.</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  defaultIgnores: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Custom URL to show upon failure</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  helpUrl:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;https://github.com/conventional-changelog/commitlint/#what-is-commitlint&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Configuration;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Configuration</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Resolve and load @commitlint/config-conventional from node_modules.</span></span>
<span class="line"><span style="color:#6A737D;">   * Referenced packages must be installed</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  extends: [</span><span style="color:#032F62;">&#39;@commitlint/config-conventional&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Resolve and load conventional-changelog-atom from node_modules.</span></span>
<span class="line"><span style="color:#6A737D;">   * Referenced packages must be installed</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  parserPreset: </span><span style="color:#032F62;">&#39;conventional-changelog-atom&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Resolve and load @commitlint/format from node_modules.</span></span>
<span class="line"><span style="color:#6A737D;">   * Referenced package must be installed</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  formatter: </span><span style="color:#032F62;">&#39;@commitlint/format&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Functions that return true if commitlint should ignore the given message.</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  ignores: [</span><span style="color:#E36209;">commit</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> commit </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Whether commitlint uses the default ignore rules.</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  defaultIgnores: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">   * Custom URL to show upon failure</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  helpUrl:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;https://github.com/conventional-changelog/commitlint/#what-is-commitlint&#39;</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Configuration;</span></span></code></pre></div><p>除了对 Commitlint 进行配置外，你还可以自定义符合 Commitizen 规范的 Adapter，定制方式可以参考现有的<a href="https://github.com/commitizen/cz-cli#adapters" target="_blank" rel="noreferrer">列表</a>。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>在一个全新的项目中，如果你们没有特殊要求，使用 Conventional Commits 规范你只需要安装一下依赖，添加钩子校验：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># For interactive commit</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@commitlint/cli</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@commitlint/config-conventional</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># For Specification validation</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@commitlint/cz-commitlint</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">commitizen</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install Husky v6</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">husky</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Activate hooks</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">husky</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Add hook</span></span>
<span class="line"><span style="color:#B392F0;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">husky</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.husky/commit-msg</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;npx --no-install commitlint --edit &quot;$1&quot;&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># For interactive commit</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@commitlint/cli</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@commitlint/config-conventional</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># For Specification validation</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@commitlint/cz-commitlint</span><span style="color:#24292E;"> </span><span style="color:#032F62;">commitizen</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install Husky v6</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">husky</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Activate hooks</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">husky</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Add hook</span></span>
<span class="line"><span style="color:#6F42C1;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">husky</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.husky/commit-msg</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;npx --no-install commitlint --edit &quot;$1&quot;&#39;</span></span></code></pre></div><p>然后，再添加上命令和交互式配置就可以了：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;commit&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;config&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;commitizen&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;path&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;@commitlint/cz-commitlint&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;commitlint&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;extends&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;@commitlint/config-conventional&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// package.json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;commit&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;git-cz&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;config&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;commitizen&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;path&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;@commitlint/cz-commitlint&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;commitlint&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;extends&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;@commitlint/config-conventional&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="建议" tabindex="-1">建议 <a class="header-anchor" href="#建议" aria-label="Permalink to &quot;建议&quot;">​</a></h2><ul><li>勤于提交：方便 CR，及时发现问题，同时也能避免代码丢失。</li><li>能 Rebase 就不要 Merge：清晰的提交历史便于大家追溯问题，回滚代码。</li></ul><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://commitlint.js.org/#/" target="_blank" rel="noreferrer">commitlint - Lint commit messages</a></li><li><a href="https://kisstar.github.io/notebook/project/basis/commit-lint.html" target="_blank" rel="noreferrer">书写友好的提交信息 | notes | Kisstar</a></li><li><a href="https://www.yuque.com/iyum9i/uur0qi/gg4kt7#BTuyT" target="_blank" rel="noreferrer">commitlint 落地推广 · 语雀</a></li><li><a href="https://github.com/streamich/git-cz" target="_blank" rel="noreferrer">streamich/git-cz: Semantic Git commits</a></li></ul>`,65),t=[e];function c(r,i,E,y,d,m){return n(),a("div",null,t)}const h=s(o,[["render",c]]);export{u as __pageData,h as default};
