<!--pages/school/finance/component/feeBusiness/feeBusiness.wxml-->
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
        <view class="flex-sub"><text class="text-gray">应收：</text><text class="text-price">{{item.NowReceivable}}</text></view>
        <view class="flex-sub"><text class="text-gray">实收：</text><text class="text-price">{{item.Paid}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">减免金额：</text><text class="text-price">{{item.Reduce}}</text></view>
        <view class="flex-sub"><text class="text-gray">欠费金额：</text><text class="text-price">{{item.Overdue}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">抵扣金额：</text><text class="text-price">{{item.Deductible}}</text></view>
        <view class="flex-sub"><text class="text-gray">退费金额：</text><text class="text-price">{{item.Return}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">缓交金额：</text><text class="text-price">{{item.Delay}}</text></view>
        <view class="flex-sub">
          <text class="text-gray">状态：</text>
          <text wx:if="{{item.IsLocked}}" class="">处理中</text>
          <text wx:else class="">{{item.ReceivableBalance <= 0 ? "已缴清" : "欠费"}}</text>
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