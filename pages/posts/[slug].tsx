import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Tags from '../../components/tags'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'

const adsMGID = `<!-- Composite Start -->
<div id="M838848ScriptRootC1376814"></div>
<script>
//<![CDATA[
(function(){var d=function(i,t){return function(){return i&&(t=i(i=0)),t}};var b=function(i,t){return function(){return t||i((t={exports:{}}).exports,t),t.exports}};var c=d(function(){});var u=d(function(){});var s=d(function(){});var p=d(function(){});var h=d(function(){});var l=d(function(){});var f=d(function(){});var M=b(function(g){c();u();s();p();h();l();f();Object.defineProperty(g,"__esModule",{value:!0});g.AdditionalWidget=void 0;var O=function(){function i(t,e){var n=this;if(this.additionalWidgets=e,this.mainWidgetJstSrc=t,this.additionalWidgets.length)for(var r=function(v){setTimeout(function(){n.init(n.additionalWidgets[v])},0)},a=0;a<this.additionalWidgets.length;a++)r(a)}return i.prototype.init=function(t){var e=this,n=this.createWidgetDiv(t.id),r=this.createWidgetScript(t.id),a=t.insertTo||"before";this.waitForElement(t.selector).then(function(v){e.insertWidgetBlock(v,n,a),e.insertWidgetScript(r)})},i.prototype.createWidgetDiv=function(t){var e=document.createElement("div"),n=document.createElement("div"),r="M".concat(838848,"ScriptRootC").concat(t);return e.classList.add("".concat(r,"-additional")),n.id=r,e.appendChild(n),e},i.prototype.createWidgetScript=function(t){var e=document.createElement("script");return e.src=this.mainWidgetJstSrc.replace(String(1376814),t.toString()),e.async=!0,e},i.prototype.insertWidgetBlock=function(t,e,n){switch(n){case"into":t.appendChild(e);break;case"before":var r=t.parentElement;r.insertBefore(e,t);break;case"after":t.insertAdjacentElement("afterend",e);break}},i.prototype.insertWidgetScript=function(t){document.head?document.head.appendChild(t):document.body.appendChild(t)},i.prototype.waitForElement=function(t){return new Promise(function(e){if(document.querySelector(t))return e(document.querySelector(t));var n=new MutationObserver(function(){document.querySelector(t)&&(e(document.querySelector(t)),n.disconnect())});n.observe(document.body,{childList:!0,subtree:!0})})},i}();g.AdditionalWidget=O});var k=b(function(W){c();u();s();p();h();l();f();Object.defineProperty(W,"__esModule",{value:!0});W.ReadMoreButton=void 0;var _=function(){function i(){var t;this.options=JSON.parse("{}"),!((t=this.options)===null||t===void 0)&&t.abTest?this.initWithAbTest():this.init()}return i.prototype.init=function(){typeof window.rmbOpts=="undefined"&&(window.rmbOpts=this.options,this.addReadMoreButton())},i.prototype.initWithAbTest=function(){var t=Number(this.options.abTest),e=Math.random(),n=(100-t)/2/100;e>n&&e<1-n&&(window["_mgRMB"+838848]=!0,this.init())},i.prototype.addReadMoreButton=function(){var t=this.getSubnetDomain();if(t.length){var e=document.getElementsByTagName("head")[0],n=document.createElement("script"),r="//cdn.".concat(t,"/js/read-more/btn.js");n.async=!0,n.src=r,n.setAttribute("fetchpriority","high"),e.insertAdjacentElement("afterbegin",n)}},i.prototype.getSubnetDomain=function(){var t="";switch(0){case 0:t="mgid.com";break;case 1:t="mgid.com";break;case 2:t="adskeeper.com";break;case 3:t="idealmedia.io";break}return t},i}();W.ReadMoreButton=_});var R=b(function(I){c();u();s();p();h();l();f();Object.defineProperty(I,"__esModule",{value:!0});var A=M(),$=k();(function(){var i=r(),t=i?"https://jsc.mgid.com/t/h/thesenholding.com.1376814.es6.js":"https://jsc.mgid.com/t/h/thesenholding.com.1376814.es5.js";G(t),v(t);for(var e=["https://servicer.mgid.com"],n=0;n<e.length;n++)a(e[n]);function r(){try{return new Function("async (x = 0) => x; try {const x=window?.x;} catch {};"),!0}catch(m){return!1}}function a(m){var o=document.createElement("link");o.rel="preconnect",o.href=m,document.head?document.head.appendChild(o):document.body.appendChild(o)}function v(m){var o=JSON.parse('[{"id":1378022,"selector":".site-header","insertTo":"before"}]');new A.AdditionalWidget(m,o)}function C(){}function G(m){var o=document.createElement("script");o.async="async",o.src=m,document.head?document.head.appendChild(o):document.body.appendChild(o)}})()});R();})();
//]]>
</script>
<!-- Composite End -->`;

const lastMGID = `<!-- Composite Start -->
<div id="M838848ScriptRootC1376798">
</div>
<script src="https://jsc.mgid.com/t/h/thesenholding.com.1376798.js" async>
</script>
<!-- Composite End --><!-- Composite Start -->
<div id="M838848ScriptRootC1376798">
</div>
<script src="https://jsc.mgid.com/t/h/thesenholding.com.1376798.js" async>
</script>
<!-- Composite End -->`;

export default function Post({ post, posts, preview }) {
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  function prefix_insert_after_paragraph(content, insertion = '---Ads here---', number = 5) {
    const closing_p = '</p>';
    const paragraphs = content.split(closing_p);
    paragraphs.forEach((element, ind) => {
      if ((ind + 1) % number === 0 ) {
        paragraphs[ind] += insertion;
      }
    });
    return paragraphs.join();
  }

  function insertLastMGID(content) {
    return content + lastMGID;
  }

  function AdsMgidHeader() {
    return (
      <div dangerouslySetInnerHTML={{ __html: adsMGID }} />
    );
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <AdsMgidHeader />
              <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}           
              />
              

              <PostBody content={prefix_insert_after_paragraph(post.content, adsMGID, 3)}
              />

              <PostBody content={insertLastMGID(post.content)} />

              
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                
              </footer>
              
            </article>
            
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData)

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  }
}                                   
