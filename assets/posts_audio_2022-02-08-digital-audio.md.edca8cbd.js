import{_ as t,o as e,c as a,Q as l}from"./chunks/framework.eecc699f.js";const s="/images/audio/digital-audio.jpeg",i="/images/audio/digital-audio/analog-signal-to-digital-signal.jpeg",n="/images/audio/digital-audio/sampling.png",d="/images/audio/digital-audio/quantification.gif",o="/images/audio/digital-audio/data-storage.png",r="/images/audio/digital-audio/audio-format.png",p="/images/audio/digital-audio/audio-data-conversion.png",g="/images/audio/digital-audio/pcm-codec.jpeg",C=JSON.parse('{"title":"数字音频基础","description":"","frontmatter":{"thumbnail":"/images/audio/digital-audio.jpeg","title":"数字音频基础","summary":"数字音频是指使用脉冲编码调制、数字信号来录音。其中包含了数字模拟转换器、模拟数字转换器、贮存以及传输。","author":"Kisstar","location":"北京","date":"2022-02-08T00:00:00.000Z","categoryKeys":["av"],"tagKeys":["audio"],"outline":"deep"},"headers":[],"relativePath":"posts/audio/2022-02-08-digital-audio.md","filePath":"posts/audio/2022-02-08-digital-audio.md"}'),h={name:"posts/audio/2022-02-08-digital-audio.md"},c=l('<p><img style="width:100%;height:350px;box-shadow:rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;" src="'+s+'" alt="Digital Audio"></p><p>数字音频是一种利用数字化手段对声音进行录制、存放、编辑、压缩或播放的技术，它是随着数字信号处理技术、计算机技术、多媒体技术的发展而形成的一种全新的声音处理手段。</p><h2 id="数字化" tabindex="-1">数字化 <a class="header-anchor" href="#数字化" aria-label="Permalink to &quot;数字化&quot;">​</a></h2><p>我们日常生活中听到的声音是一种模拟信号（英语：analog signal，是指在时域上数学形式为连续函数的信号），它不仅在时间上连续，而且在幅度上也连续，我们称之为模拟音频。</p><p>计算机数据的存储是以 0、1 的形式存取的，那么数字音频就是首先将音频文件转化，接着再将这些电平信号转化成二进制数据保存。</p><p><img src="'+i+'" alt="AnalogSignal2DigitalSignal"></p><p>将模拟音频转换为数字音频的过程采用了模数转换（A/D）技术。所谓模数转换就是将模拟信号转化为数字信号，转换过程包括采样、量化和编码三个步骤。</p><h3 id="采样" tabindex="-1">采样 <a class="header-anchor" href="#采样" aria-label="Permalink to &quot;采样&quot;">​</a></h3><p>采样是指用每隔一定时间的信号样值序列来代替原来在时间上连续的信号，也就是在时间上将模拟信号离散化。</p><p>如下是同一波形的两种采样率对比，可以看到低采样率的 A 采样波形严重失真，而高采样率的 B 则几乎完全重现原始波形：</p><p><img src="'+n+'" alt="Sampling"></p><p>根据奈奎斯特定理（也称为采样定理），按比声音最高频率高 2 倍以上的频率对声音进行采样(也称为 AD 转换)。</p><p>对于高质量的音频信号，其频率范围（人耳能够听到的频率范围）是 20Hz~20kHz，所以采样频率一般为 44.1kHz，而所谓的 44.1kHz 就是代表 1 秒会采样 44100 次。</p><p>以下是数字音频中一些常用的采样率：</p><table><thead><tr><th style="text-align:left;">采样率</th><th style="text-align:left;">品质级别</th><th style="text-align:left;">频率范围</th></tr></thead><tbody><tr><td style="text-align:left;">11,025 Hz</td><td style="text-align:left;">较差的 AM 电台（低端多媒体）</td><td style="text-align:left;">0–5,512 Hz</td></tr><tr><td style="text-align:left;">22,050 Hz</td><td style="text-align:left;">接近 FM 电台（高端多媒体）</td><td style="text-align:left;">0–11,025 Hz</td></tr><tr><td style="text-align:left;">32,000 Hz</td><td style="text-align:left;">好于 FM 电台（标准广播采样率</td><td style="text-align:left;">） 0–16,000 Hz</td></tr><tr><td style="text-align:left;">44,100 Hz</td><td style="text-align:left;">CD</td><td style="text-align:left;">0–22,050 Hz</td></tr><tr><td style="text-align:left;">48,000 Hz</td><td style="text-align:left;">标准 DVD</td><td style="text-align:left;">0–24,000 Hz</td></tr><tr><td style="text-align:left;">96,000 Hz</td><td style="text-align:left;">蓝光 DVD</td><td style="text-align:left;">0–48,000 Hz</td></tr></tbody></table><h3 id="量化" tabindex="-1">量化 <a class="header-anchor" href="#量化" aria-label="Permalink to &quot;量化&quot;">​</a></h3><p>那么，具体的每个采样又该如何表示呢？这就涉及到了量化。</p><p>量化是指在幅度轴上对信号进行数字化，比如用 16 比特 的二进制信号来表示声音的一个采样，而 16 比特（一个 short）所表示的 范围是 <code>[-32768，32767]</code>，共有 65536 个可能取值，因此最终模拟的音频 信号在幅度上也分为了 65536 层。</p><p><img src="'+d+'" alt="Quantification"></p><p>每次采样存储着多少比特（英语：bit）的信息成为音频位深度，其数值数值直接对应着每次采样的分辨率。</p><p>位深度决定动态范围。采样声波时，为每个采样指定最接近原始声波振幅的振幅值。较高的位深度可提供更多可能的振幅值，产生更大的动态范围、更低的噪声基准和更高的保真度。</p><p>以下是数字音频中一些常用的位深度：</p><table><thead><tr><th style="text-align:left;">位深度</th><th style="text-align:left;">品质级别</th><th style="text-align:left;">振幅值</th><th style="text-align:left;">动态范围</th></tr></thead><tbody><tr><td style="text-align:left;">8 位</td><td style="text-align:left;">电话</td><td style="text-align:left;">256</td><td style="text-align:left;">48 dB</td></tr><tr><td style="text-align:left;">16 位</td><td style="text-align:left;">音频 CD</td><td style="text-align:left;">65,536</td><td style="text-align:left;">96 dB</td></tr><tr><td style="text-align:left;">24 位</td><td style="text-align:left;">音频 DVD</td><td style="text-align:left;">16,777,216</td><td style="text-align:left;">144 dB</td></tr><tr><td style="text-align:left;">32 位</td><td style="text-align:left;">最佳</td><td style="text-align:left;">4,294,967,296</td><td style="text-align:left;">192 dB</td></tr></tbody></table><h3 id="编码" tabindex="-1">编码 <a class="header-anchor" href="#编码" aria-label="Permalink to &quot;编码&quot;">​</a></h3><p>那么，这么多的采样该如何进行存储呢？这就涉及到了编码。</p><p>所谓编码，就是按照一定的格式记录采样和量化后的数字数据，比如顺序存储或压缩存储，等等。根据编码方式的不同，音频编码技术分为三种：波形编码、参数编码和混合编码。</p><table><thead><tr><th style="text-align:left;">编码</th><th style="text-align:left;">优点</th><th style="text-align:left;">缺点</th></tr></thead><tbody><tr><td style="text-align:left;">波形编码</td><td style="text-align:left;">方法简单、易于实现、适应能力强并且语音质量好。</td><td style="text-align:left;">压缩比相对较低，导致较高的编码率。</td></tr><tr><td style="text-align:left;">参数编码</td><td style="text-align:left;">保密性很好，一直被应用在军事上。</td><td style="text-align:left;">失真会比较大。</td></tr><tr><td style="text-align:left;">混合编码</td><td style="text-align:left;">结合了前两者，克服了弱点，具备高质量和低码率。</td><td style="text-align:left;"></td></tr></tbody></table><p>编码涉及到各种各样的格式，通常所说的音频的裸数据格式就是脉冲编码调制数据。</p><h2 id="pcm" tabindex="-1">PCM <a class="header-anchor" href="#pcm" aria-label="Permalink to &quot;PCM&quot;">​</a></h2><p>脉冲编码调制（Pulse Code Modulation，PCM）是一种模拟信号的数字化方法。PCM 将信号的强度依照同样的间距分成数段，然后用独特的数字记号（通常是二进制）来量化。</p><p>描述一段 PCM 数据一般需要以下几个概念：量化格式（sampleFormat，也称位深度）、采样率（sampleRate）、声道数（channel）。</p><h3 id="基础概念" tabindex="-1">基础概念 <a class="header-anchor" href="#基础概念" aria-label="Permalink to &quot;基础概念&quot;">​</a></h3><p><strong>采样频率</strong>：指每秒钟取得声音样本的次数。采样频率越高，声音的质量也就越好，声音的还原也就越真实，但同时它占的资源比较多。</p><p><strong>位深度</strong>：表示一个样本存储所占用的二进制位数。计算机中音频的量化深度一般为 4、8、16、32 位（bit）等。</p><p>采样位数的大小影响声音的质量，采样位数越多，量化后的波形越接近原始波形，声音的质量越高，而需要的存储空间也越多；位数越少，声音的质量越低，需要的存储空间越少。</p><p><strong>声道数</strong>：声道是指声音在录制或播放时在不同空间位置采集或回放的相互独立的音频信号，所以声道数也就是声音录制时的音源数量或回放时相应的扬声器数量。</p><p>对于声音格式，还有一个概念用来描述它的大小，称为数据比特率，即 1 秒时间内的比特数目，它用于衡量音频数据单位时间内的容量大小。</p><p>以 CD 的音质为例，量化格式为 16 比特，采样率为 44100，声道数为 2，这些信息就描述了 CD 的音质。其数据比特率计算如下所示：</p><p>$44100<em>16</em>2 = 1378.125$kbps</p><h3 id="数据存储" tabindex="-1">数据存储 <a class="header-anchor" href="#数据存储" aria-label="Permalink to &quot;数据存储&quot;">​</a></h3><p>PCM 文件没有头部信息，全部是采样量化后的未压缩音频数据。</p><p>如果是单声道音频，采样数据按照时间的先后顺序依次存储，有的时候也会采用 LRLRLR 方式存储，只是另一个声道的数据为 0。</p><p>如果是双声道音频，则按照 LRLRLR 方式存储，每个采样点的存储方式还与字节序有关。大端字节序如下图所示：</p><p><img src="'+o+`" alt="PCM Data Storage"></p><p>关于字节序，可查看<a href="https://www.ruanyifeng.com/blog/2016/11/byte-order.html" target="_blank" rel="noreferrer">理解字节序</a>。</p><p>不同的驱动程序对于多声道数据的排列方式可能稍有区别，下面是常用的声道排列地图：</p><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">2:  FL FR                     (stereo)</span></span>
<span class="line"><span style="color:#e1e4e8;">3:  FL FR LFE                 (2.1 surround)</span></span>
<span class="line"><span style="color:#e1e4e8;">4:  FL FR BL BR               (quad)</span></span>
<span class="line"><span style="color:#e1e4e8;">5:  FL FR FC BL BR            (quad + center)</span></span>
<span class="line"><span style="color:#e1e4e8;">6:  FL FR FC LFE SL SR        (5.1 surround - last two can also be BL BR)</span></span>
<span class="line"><span style="color:#e1e4e8;">7:  FL FR FC LFE BC SL SR     (6.1 surround)</span></span>
<span class="line"><span style="color:#e1e4e8;">8:  FL FR FC LFE BL BR SL SR  (7.1 surround)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">2:  FL FR                     (stereo)</span></span>
<span class="line"><span style="color:#24292e;">3:  FL FR LFE                 (2.1 surround)</span></span>
<span class="line"><span style="color:#24292e;">4:  FL FR BL BR               (quad)</span></span>
<span class="line"><span style="color:#24292e;">5:  FL FR FC BL BR            (quad + center)</span></span>
<span class="line"><span style="color:#24292e;">6:  FL FR FC LFE SL SR        (5.1 surround - last two can also be BL BR)</span></span>
<span class="line"><span style="color:#24292e;">7:  FL FR FC LFE BC SL SR     (6.1 surround)</span></span>
<span class="line"><span style="color:#24292e;">8:  FL FR FC LFE BL BR SL SR  (7.1 surround)</span></span></code></pre></div><h2 id="压缩编码" tabindex="-1">压缩编码 <a class="header-anchor" href="#压缩编码" aria-label="Permalink to &quot;压缩编码&quot;">​</a></h2><p>采用 PCM 编码可以高效的还原音频数据，但是若要在网络中实时在线传播的话，那么这个数据量可能就太大了，所以必须对其进行压缩编码。</p><p>压缩编码的原理实际上是压缩掉冗余信号，冗余信号是指不能被人耳感知到的信号，包含人耳听觉范围之外的音频信号以及被掩蔽掉的音频信号等。</p><p>压缩算法包括有损压缩和无损压缩。无损压缩是指解压后的数据可以完全复原。在常用的压缩格式中，用得较多的是有损压缩，有损压缩是指解压后的数据不能完全复原，会丢失一部分信息，压缩比越小，丢失的信息就越多，信号还原后的失真就会越大。</p><p>根据不同的应用场景(包括存储设备、传输网络环境、播放设备 等)，可以选用不同的压缩编码算法，如 PCM、WAV、AAC、MP3、 Ogg 等。</p><table><thead><tr><th style="text-align:left;">编码格式</th><th style="text-align:left;">特点</th><th style="text-align:left;">适用场合</th></tr></thead><tbody><tr><td style="text-align:left;">WAV 编码</td><td style="text-align:left;">音质非常好，大量软件都支持。</td><td style="text-align:left;">多媒体开发的中间文件、保存音乐和音效素材。</td></tr><tr><td style="text-align:left;">MP3 编码</td><td style="text-align:left;">压缩比比较高，大量软件 和硬件都支持，兼容性好。</td><td style="text-align:left;">高比特率下对兼容性有要求的音乐欣赏。</td></tr><tr><td style="text-align:left;">AAC 编码</td><td style="text-align:left;">在小于 128Kbit/s 的码率下表现优异。</td><td style="text-align:left;">128Kbit/s 以下的音频编码，多用于视频中音频轨的编 码。</td></tr><tr><td style="text-align:left;">Ogg 编码</td><td style="text-align:left;">高中低码 率下均有良好的表现，兼容性不够好，流媒体特性不支持。</td><td style="text-align:left;">语音聊天的音频消息场景。</td></tr></tbody></table><h2 id="格式" tabindex="-1">格式 <a class="header-anchor" href="#格式" aria-label="Permalink to &quot;格式&quot;">​</a></h2><p>通常，一种文件格式对应一种音频编码。但是也有例外，比如 .caf 的文件格式就能包含 MP3、LPCM 和其他格式编码的音频数据，AAC 编码格式对应的文件的扩展名就有 .aac、 .mp4 和 .m4a。</p><p>文件格式与音频编码的名称有时相同，比如平时我们经常说的 MP3 既是文件格式，又是编码格式；也有时不同。而且有时它们的称呼也不规范，比如为了方便人们一般称 Monkey&#39;s Audio 音频编码格式为 ape 编码。</p><p>常用的音频编码格式与文件格式的对应关系总结如下：</p><p><img src="`+r+'" alt="Audio Format"></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>在模拟信号系统中，声音由空气中传递的声波透过转换器（例如麦克风）转存成电流信号的电波。而重现声音则是相反的过程，透过放大器将电子信号转成物理声波，再借由扩音器播放。</p><img height="450" src="'+p+'" alt="Audio Data Conversion"><p>经过转存、编码、复制以及放大或许会丧失声音的真实度，但仍然能够保持与其基音、声音特色相似的波形。模拟信号容易受到噪音及变形的影响，相关器材电路所产生的电流更是无可避免。在信号较为纯净的录音里，整个过程里仍然存有许多噪音及有损。</p><p>数字声音和一般磁带、广播、电视中的声音就存储播放方式而言有着本质区别。当音频数字化后，有损及噪音只在数字及模拟间转换时产生。</p><p><img src="'+g+'" alt="PCM Codec"></p><p>相比而言，它具有存储方便、存储成本低廉、存储和传输的过程中没有声音的失真、编辑和处理非常方便等特点。</p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://helpx.adobe.com/cn/audition/using/digitizing-audio.html" target="_blank" rel="noreferrer">数字化音频</a></li><li><a href="https://www.codenong.com/cs107136250/" target="_blank" rel="noreferrer">音视频学习- PCM 格式介绍 | 码农家园</a></li><li><a href="https://zhuanlan.zhihu.com/p/212318683" target="_blank" rel="noreferrer">数字音频基础 - 从 PCM 说起 - 知乎</a></li><li><a href="https://book.douban.com/subject/30124646/" target="_blank" rel="noreferrer">《音视频开发进阶指南》</a></li></ul>',67),f=[c];function u(y,x,m,b,_,F){return e(),a("div",null,f)}const R=t(h,[["render",u]]);export{C as __pageData,R as default};