<!--pages/school/finance/component/subsidyInfo/subsidyInfo.wxml-->
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
        <text class="text-xl text-bold">{{item.GrantDate}}{{item.SubsidyType}}</text>
      </view>
    </view>
    <view class="text-content" style="max-height: unset;">
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">发放金额：</text><text class="text-price">{{item.Payable}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">抵扣项目：</text><text class="">{{item.DiKouItems[0].DYear}}{{item.DiKouItems[0].DFeeRange}}{{item.DiKouItems[0].DBaseChargeProject}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">抵扣金额：</text><text class="text-price">{{item.DiKouItems[0].DDeductible}}</text></view>
        <view class="flex-sub"><text class="text-gray">实际发放金额：</text><text class="text-price">{{item.Paid}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">状态：</text><text class="">{{item.State}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub" wx:if="{{item.Remark}}"><text class="text-gray">发放说明：</text><text class="">{{item.Remark ? item.Remark : ''}}</text></view>
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