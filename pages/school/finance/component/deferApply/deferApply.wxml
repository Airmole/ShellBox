<!--pages/school/finance/component/deferApply/deferApply.wxml-->
<scroll-view scroll-x class="bg-cyan nav">
  <view class="flex text-center">
    <view class="cu-item flex-sub {{item.value==tab?'text-white cur':''}}" wx:for="{{tabs}}" wx:key="tab"
      bindtap="tabChanged" data-index="{{index}}">{{item.title}}</view>
  </view>
</scroll-view>

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
        <view class="flex-sub" wx:if="{{tab == 'pending'}}"><text class="text-gray">欠费金额：</text><text class="text-price">{{item.Overdue}}</text></view>
        <view class="flex-sub" wx:if="{{tab == 'finished'}}"><text class="text-gray">应收金额：</text><text class="text-price">{{item.ShowReceivable}}</text></view>
        <view class="flex-sub"><text class="text-gray">缓交金额：</text><text class="text-price">{{tab == 'pending' ? item.Defer : item.Amount.Amount}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">到期日期：</text><text class="">{{  item.showDate}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub" wx:if="{{tab == 'pending'}}"><text class="text-gray">上传附件：</text><text class="">{{item.EnableAttachment}}</text></view>
        <view class="flex-sub" wx:else><text class="text-gray">申请附件：</text><text class="">{{item.FileName}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">助学贷款回执校验码：</text><text class="">{{item.Zxdkhzjym}}</text></view>
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