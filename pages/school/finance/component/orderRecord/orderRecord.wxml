<!--pages/school/finance/component/orderRecord/orderRecord.wxml-->
<view class="cu-card dynamic radius" wx:for="{{datalist}}" wx:key="list">
  <view class="cu-item shadow margin">
    <view class="cu-bar">
      <view class="action">
        <text class="cuIcon-titles text-cyan"></text>
        <text class="text-xl text-bold">{{item.OrderDetailList[0].Year}}{{item.OrderDetailList[0].FeeRange.Name}}{{item.OrderDetailList[0].ChargeProject.Name}}</text>
      </view>
    </view>
    <view class="text-content" style="max-height: unset;">
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">订单编号：</text><text class="text-price">{{item.OrderNo}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">订单金额：</text><text class="text-price">{{item.Amount}}</text></view>
        <view class="flex-sub"><text class="text-gray">支付金额：</text><text class="text-price">{{item.PayAmount}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">收费方式：</text><text class="">{{item.ChargeType.Name}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">订单状态：</text><text class="">{{item.OrderStatus}}</text></view>
      </view>
      <view class="flex">
        <view class="flex-sub"><text class="text-gray">订单时间：</text><text class="">{{item.CreateDate}}</text></view>
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