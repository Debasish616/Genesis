import React from 'react';
import NormalButton from '@/components/Buttons/NormalButton';
import { DataExtendedInterface, DataTypeEnum } from '@/interfaces/DataInterface';
import { getDateToStringFromSec, getDayTimeToStringFromSec } from '@/utils/Helper';
import { FaCreditCard } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { PiFileLock } from 'react-icons/pi';

function FeatureItem({ icon, heading, text }) {
  return (
    <div className="relative group w-[14rem] flex flex-col">
      <div className="absolute -inset-0 bg-gradient-to-r from-primary via-third to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="flex items-center flex-col border border-primary rounded-lg pt-8 pb-4 gap-2 glassmorphism-bg bg-primary-bg/90 cursor-pointer w-full h-full px-2">
        {icon}
        <div className="flex_center">
          <h1 className="text-lg text-ellipsis overflow-hidden truncate">{heading}</h1>
        </div>
        <div className="text-center w-11/12">
          <h1 className="text-sm">{text}</h1>
        </div>
        {/* <NormalButton
          onClick={showData}
          className="btn_primary_1 text-sm px-4 py-2"
          text={type === DataTypeEnum.CREDENTIALS ? "Check Credentials" : type === DataTypeEnum.FILE ? "Download File" : ""}
          loading={isDownloading}
        /> */}
      </div>
    </div>
  );
}

export default FeatureItem;
