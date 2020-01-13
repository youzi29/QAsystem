<template>
	<div>

		<!--网站头部-->
		<div class="home">
			<div class="home-header">
				<div class="header-img">
					<img src="./image/dayi.png" />
				</div>
				<div class="header-text" v-for="(item ,index) in title">
					<div :class="[active == index? 'color': '']" @click="tap(index)">
						{{item}}
					</div>
				</div>
				<div class="header-seacher">
					<input placeholder="请输入需要查询的问题" />
					<a>
						<van-icon name="search" /></a>
				</div>
				<div class="header-btn">
					<button>登录</button>
				</div>
			</div>
		</div>
		<!--问题列表-->
		<div class="issue">
			<div class="issue-content">
				
					<div class="issue-left">
						<div class="issue-header-h" v-for="(item ,index) in title1">
							<div :class="[active1 == index? 'color1': '']" @click="tap1(index)">{{item}}</div>
						</div>
						<div class="issue-list">
							<h3>为什么很多人上了研究生变得不快乐了？</h3>
							<p :class= "[showtext? '': 'showtext']">
							很多大学生，很多大学生，研一的同学，乃至社会上的人都会认为，
							很多大学生，研一的同学，乃至社会上的人都会认为，很多大学生，
							研一的同学，乃至社会上的人都会认为，研一的同学，乃至社会上的
							人都会认为，很多大学生，研一的同学，乃至社会上的人都会认为，
							研究生和本科生没什么太大的区别。但实际上，，研究生和本科生没
							什么太大的区别。但实际上，，研究生和本科生没什么太大的区别。
							但实际上，读研并不像之前在学校里的上课——考试的模式
							</p>
							<div class="issue-bottom">
							   <div @click="tap3()" :class= "[zantong ? '': 'color2']"><i><van-icon name="good-job" /></i>&nbsp;赞同&nbsp;{{count1}}</div>
							   <div @click="tap4()"><i><van-icon name="chat" /></i>{{count2}}&nbsp;条评论</div>
							   <div @click="tap5()"  :class= "[like ? '': 'color2']" ><i><van-icon name="like" /></i>&nbsp;喜欢</div>
							   <!--阅读全文-->
							   <button @click="tap2()">{{read}}<i><van-icon :name="direct" /></i></button>
							</div>
							<div class="issue-pin">
								<div class="issue-pin-list">
									<div class="list1">
										<div class="list-header">
											<span><img src="./image/tx1.jpg">柚子</span> 
											<div>2020-01-11</div>
										</div>
										<p class="p1">研究生和本科生没什么太大的区别。但实际上，，研究生和本科生没
							什么太大的区别。但实际上，，研究生和本科生没什么太大的区别。
							但实际上，读研并不像之前在学校里的上课——考试的模式</p></div>
								</div>
							</div>
						</div>
					</div>
					<div class="issue-right">

					</div>
				
			</div>
		</div>
	</div>
</template>
<script>
	import {
		add
	} from '@/api/index.js'
	export default {
		components: {},
		data() {
			return {
				title: ["首页", "等你来答", "发现更多"],
				title1:["推荐" , "热榜" ,"关注"],
				showtext: true,
				zantong: true,
				like:true,
				read: '阅读全文',
				count1:670,//赞同
				count2:333,//评论
				direct:'arrow-down',
				active: 0,
				active1:0
			};
		},
		methods: {
			tap(index) {
				this.active = index;
			},
			tap1(index) {
				this.active1 = index;
			},
			//点击阅读全文
			tap2(){
				let flag = 1;
				if( this.flag == 1){
					this.showtext = false ;
					this.read = "收起";
					this.flag = 2;
					this.direct = "arrow-up";
				}else{
					this.showtext =true;
					this.read= "阅读全文";
					this.direct = "arrow-down";
					this.flag =1;
				}
			},
			//赞同
			tap3(){
				let flag = 1;
				if(this.flag == 1){
					this.zantong = true;
					this.flag = 2;
					this.count1 = this.count1-1;
				}else{
					this.zantong =false;
					this.flag = 1;
					this.count1 = this.count1+1;
				}
			},
			//喜欢
			tap5(){
				let flag = 1;
				if(this.flag == 1){
					this.like = true;
					this.flag = 2;
					
				}else{
					this.like =false;
					this.flag = 1;
					
				}
			},
			
		},

	};
</script>
<style lang="scss" scoped>
	$family: "PingFang SC",
	"Hiragino Sans GB",
	"Heiti SC",
	"Microsoft YaHei",
	"WenQuanYi Micro Hei";
	$shadow: -4px 0 7px -1px rgba(0, 0, 0, 0.05),
	//左边阴影
	0 -4px 7px -1px rgba(0, 0, 0, 0.05),
	//顶部阴影
	0 4px 7px -1px rgba(0, 0, 0, 0.05),
	//底部阴影
	4px 0 7px -1px rgba(0, 0, 0, 0.05); //右边阴影; 

	.home {
		width: 100%;
		font-family: $family;
		background: #fff;
		box-shadow: 0 4px 7px -1px rgba(0, 0, 0, 0.05); //底部阴影;
		position: fixed;
		top: 0;

		.home-header {
			margin: 0 25%;
			height: 3.8rem;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.header-img {
				width: 3.8rem;
				// margin-left: 25%;
				margin-right: 0;
			}

			.header-text {
				font-size: 1.1rem;
				// font-weight: 600;
				color: #888;
				width: 8%;

				div {
					// margin-right: .2%; 
					cursor: pointer;
				}

				.color {
					color: #333;
					font-weight: 600;
					font-size: 1.2rem;
				}
			}

			.header-seacher {
				width: 30%;
				display: flex;
				font-size: 1.1rem;
				border: #eee solid .1rem;
				background: #eee;
				border-radius: .2rem;
				display: flex;
				align-items: center;
				margin-right: 5%;
				margin-left: .5%;

				a {
					font-size: 1.8rem;
					color: #888;
					height: 1.9rem;
					cursor: pointer;
					margin-right: .1rem;
				}

				input {
					border: none;
					background: none;
					width: 100%;
					height: 3rem;
					padding-left: 1.4%;
				}
			}

			.header-btn {
				width: 8%;
				// margin-right: 25%;
				font-size: 1rem;
				color: #333;

				button {
					width: 100%;
					height: 2.5rem;
					background: none;
					border: #0084ffed solid .05rem;
					border-radius: .2rem;
					letter-spacing: .1rem;
				}
			}
		}
	}

	//问题列表
	.issue {
		width: 100%;
		font-family: $family;
		margin-top: 5rem;

		.issue-content {
			margin: 0 25%;
			height: 100rem;
			display: flex;
			padding-bottom: 2rem;

			justify-content: space-around;

			border: black solid 1px;
			//background: #fff;
		
				.issue-left {
					background: #fff;
					height: auto;
					width: 69%;
					padding: 1.2rem;
					padding-right: .7rem;
					
					// border: black solid 1px;
					.color1{
						color: #0084ffed;
					}
					.issue-header-h{
						display: inline-block;
						font-size:1.3rem;
						margin-bottom: 1rem;
						
						div{
							margin-right: 2.5rem;
						}
					}

					.issue-list {
						border-top: #eee solid 1px;
						padding-top: 1rem;
						padding-bottom: 2rem;
						width: 100%;
						height: auto;
						//text-indent: 1rem;
						line-height: 1.9rem;
						h3 {
							font-size: 1.5rem;
							margin-bottom: .5rem;
						}

						p {
							 font-size: 1.1rem;
							 color: #1a1a1a;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							 display: -webkit-box;
							  overflow: hidden;
							text-overflow: ellipsis;
						} 
						.showtext{
							display: block;
							overflow: visible;
						}
						.issue-bottom{
							display: flex;
							color:#888;
							justify-content: flex-start;
							align-items: center;
							font-size:1rem;
							margin-top: 1rem;
							padding-bottom: .5rem;
							border-bottom: #eee solid 1px;
							div{
								display: flex;
								align-items: center;
								cursor: pointer;
								margin-right: 1rem;
								i{
									margin-right: .1rem;
								}
							}
							.color2{
								color:#1989fa;
							}
							button{
								border: none;
								background: none;
								display: flex;
								align-items: center;
								color: #0084ffed;
								i{
									height: 1.5rem;
									margin-left: .1rem;
								}
	
							}
						}
						.issue-pin{
							width: 97%;
							margin: 1rem auto;
							height: auto;
							border:black 1px solid;
							.issue-pin-list{
								.list1{
									.list-header{
										display: flex;
										justify-content: space-between;
										align-items: center;
									    span{
									    	font-size: 1.3rem;
									    	display: flex;
									    	align-items: center;
									    	img{
									    		width: 2.5rem;
									    		height: 2.5rem;
									    		border-radius: 50%;
									    		margin-right: .5rem;
									    	}
									    }
									    div{
									    	font-size: 1.1rem;
									    	font-weight: 500;
									    }
									}
									.p1{
										padding-left: 2rem;
										display: block;
										 overflow:visible;
									}
								}
							}
						}
					}
				}

				.issue-right {
					height: 5rem;
					width: 25%;
					padding: .5rem;
					border: black solid 1px;
				}
			

		}
	}
</style>
