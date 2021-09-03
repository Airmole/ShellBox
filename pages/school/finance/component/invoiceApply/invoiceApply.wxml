<!--pages/school/finance/component/invoiceApply/invoiceApply.wxml-->
<scroll-view scroll-x class="bg-cyan nav">
  <view class="flex text-center">
    <view class="cu-item flex-sub {{item.value==tab?'text-white cur':''}}" wx:for="{{tabs}}" wx:key="tab"
      bindtap="tabChanged" data-index="{{index}}">{{item.title}}</view>
  </view>
</scroll-view>

<block wx:if="{{tab == 'pending'}}">
  <!-- 查询年份选择区域 -->
  <view class="margin">
    <view class="cu-bar bg-white solid-bottom radius-top">
      <view class="action">
        <text class="cuIcon-title text-cyan"></text> 开票收费年度
      </view>
    </view>
    <view class="cu-form-group">
      <view class="title">年份</view>
      <picker mode="date" value="{{year}}" fields="year" end="{{year}}" bindchange="yearChange">
        <view class="picker"> {{year}} </view>
      </picker>
    </view>
    <view class="flex cu-form-group justify-end radius-bottom">
      <button bindtap="getDatalist" class="cu-btn bg-cyan round shadow text-white">查找</button>
    </view>
  </view>
  <!-- 结果列表 -->
  <view class="cu-card dynamic radius" wx:for="{{datalist}}" wx:key="list">
    <view class="cu-item shadow margin">
      <view class="cu-bar">
        <view class="action">
          <text class="cuIcon-titles text-cyan"></text>
          <text class="text-xl text-bold">{{item.Year}}{{item.FeeRange.Name}}{{item.ChargeProject.Name}}</text>
        </view>
      </view>
      <view class="text-content" style="max-height: unset;">
        <view class="flex">
          <view class="flex-sub"><text class="text-gray">应收金额：</text><text
              class="text-price">{{item.Amount.Amount}}</text></view>
          <view class="flex-sub"><text class="text-gray">实缴金额：</text><text class="text-price">{{item.Paid}}</text>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub"><text class="text-gray">缓交金额：</text><text class="text-price">{{item.Delay}}</text>
          </view>
          <view class="flex-sub"><text class="text-gray">可抵扣金额：</text><text
              class="text-price">{{item.Deductible}}</text></view>
        </view>
        <view class="flex">
          <view class="flex-sub"><text class="text-gray">退费金额：</text><text class="text-price">{{item.Return}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</block>
<block wx:else>
  <!-- 结果列表 -->
  <view class="cu-card dynamic radius" wx:for="{{datalist}}" wx:key="list">
    <view class="cu-item shadow margin">
      <view class="cu-bar">
        <view class="action">
          <text class="cuIcon-titles text-cyan"></text>
          <text class="text-xl text-bold">票据号：{{item.cfinvoicenum}}</text>
        </view>
      </view>
      <view class="text-content" style="max-height: unset;">
        <view class="flex">
          <view class="flex-sub"><text class="text-gray">临时单号：</text><text class="">{{item.fnumber}}</text></view>
        </view>
        <view class="flex">
          <view class="flex-sub">
            <text class="text-gray">票据状态：</text>
            <text wx:if="{{item.cfkpsate == '01'}}">未开票</text>
            <text wx:elif="{{item.cfkpsate == '02'}}">已开票</text>
            <text wx:elif="{{item.cfkpsate == '03'}}">作废</text>
            <text wx:elif="{{item.cfkpsate == '03'}}">红冲</text>
            <text wx:else>{{item.cfkpsate}}</text>
          </view>
          <view class="flex-sub"><text class="text-gray">价税合计：</text><text
              class="text-price">{{item.total_money}}</text></view>
        </view>
        <view class="flex">
          <view class="flex-sub">
            <text class="text-gray">发票类型：</text>
            <text wx:if="{{item.open_type == '0'}}">增值税专用发票</text>
            <text wx:if="{{item.open_type == '2'}}">增值税普通发票</text>
            <text wx:if="{{item.open_type == '51'}}">电子发票</text>
            <text wx:else>{{item.open_type}}</text>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub"><text class="text-gray">开票日期：</text><text class="">{{item.showDate}}</text>
          </view>
        </view>
        <view class="flex margin-top">
          <view class="flex-sub justify-center flex">
            <button bindtap="showTargetModal" data-index="{{index}}" class="cu-btn bg-cyan round shadow text-white"> <text class="cuIcon-attention"></text> 查看</button>
          </view>
          <view class="flex-sub justify-center flex">
            <button bindtap="download" data-index="{{index}}" class="cu-btn bg-cyan round shadow text-white"> <text class="cuIcon-down"></text> 下载</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</block>
<!-- 票据明细模态框 -->
<view class="cu-modal {{showTarget ? 'show' : ''}}">
  <view class="cu-dialog">
    <view class="cu-bar bg-white justify-end">
      <view class="content">票据明细</view>
      <view class="action" bindtap="closeTargetModal">
        <text class="cuIcon-close text-black"></text>
      </view>
    </view>
    <view class="padding-xl text-left">
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">票据号：</text><text class="">{{datalist[target].cfinvoicenum}}</text>
        </view>
          <view class="flex-sub">
            <text class="text-gray">发票类型：</text>
            <text wx:if="{{datalist[target].open_type == '0'}}">增值税专用发票</text>
            <text wx:if="{{datalist[target].open_type == '2'}}">增值税普通发票</text>
            <text wx:if="{{datalist[target].open_type == '51'}}">电子发票</text>
            <text wx:else>{{datalist[target].open_type}}</text>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub"><text class="text-gray">开票日期：</text><text class="">{{datalist[target].showDate}}</text>
          </view>
          <view class="flex-sub"><text class="text-gray">缴款单位：</text><text class="">{{datalist[target].cfbuyername}}</text>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub" wx:if="{{datalist[target].cfbankname}}"><text class="text-gray">购方开户银行：</text><text class="">{{datalist[target].cfbankname}}</text>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub" wx:if="{{datalist[target].cfbankaccount}}"><text class="text-gray">购方银行账号：</text><text class="">{{datalist[target].cfbankaccount}}</text>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub" wx:if="{{datalist[target].cfbuyeraddr}}"><text class="text-gray">地址：</text><text class="">{{datalist[target].cfbuyeraddr}}</text>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub" wx:if="{{datalist[target].cfbuyerphone}}"><text class="text-gray">电话：</text><text class="">{{datalist[target].cfbuyerphone}}</text>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub" wx:if="{{datalist[target].cfbuyeremail}}"><text class="text-gray">寄送电子邮箱：</text><text class="">{{datalist[target].cfbuyeremail}}</text>
          </view>
        </view>
        <view class="bg-white padding-sm margin-tb-sm" wx:for="{{targetData}}" wx:key="detail">
          <view class="flex">
            <view class="flex-sub"><text class="text-gray">规格：</text><text>{{item.cfspectype}} - {{item.cfgname}}</text>
            </view>
          </view>
          <view class="flex">
            <view class="flex-sub"><text class="text-gray">数量：</text><text>{{item.cfqty}}</text>
            </view>
            <view class="flex-sub"><text class="text-gray">金额：</text><text class="text-price">{{item.cfamount}}</text>
            </view>
          </view>
          <view class="flex">
            <view class="flex-sub"><text class="text-gray">税率：</text><text>{{item.cfrate}}%</text>
            </view>
            <view class="flex-sub"><text class="text-gray">税额：</text><text class="text-price">{{item.cfrate * 0.01 * item.cfamount}}</text>
            </view>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub"><text class="text-gray">金额合计：</text><text class="text-price">{{datalist[target].total_money}}</text>
          </view>
        </view>
    </view>
  </view>
</view>


<view wx:if="{{datalist.length == 0}}" class="margin-xl padding-xl text-center">
  <tips tipsText="这里是空的，什么都没有~"></tips>
</view>
<view wx:else class="margin-bottom-xl padding-bottom-xl text-center">
  <view class="padding-xl margin-bottom-xl"><text class="text-black">到底啦~什么都没有了</text></view>
</view>