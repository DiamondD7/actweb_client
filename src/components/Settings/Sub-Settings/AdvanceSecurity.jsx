import React from "react";
import { LockSimpleOpenIcon } from "@phosphor-icons/react";

const AdvanceSecurity = () => {
  return (
    <div>
      <div className="-display-flex-aligned-center -gap-20">
        <h5>Two Factor Authentication</h5>
        <button className="advance-security-radio-disabled__btn">
          Disabled <LockSimpleOpenIcon size={20} color="gray" />
        </button>
      </div>
    </div>
  );
};

export default AdvanceSecurity;
