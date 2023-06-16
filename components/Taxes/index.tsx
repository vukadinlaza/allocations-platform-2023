import { useAuthContext } from '@/app/(private)/context';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useFlags } from 'launchdarkly-react-client-sdk';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import None from '../None';
import TaxesFundManager from './FundManager';
import TaxesInvestor from './Investor';

export default function Taxes() {
  const [investorView, setInvestorView] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(true);

  const { user } = useAuthContext();
  let { taxDashboard } = useFlags();

  return (
    <>
      {user && !user.is_super_admin && !taxDashboard && (
        <None text="Taxes are coming soon." />
      )}
      {user && (user.is_super_admin || taxDashboard) && (
        <div className="bg-white border rounded card">
          <header className="pb-2">
            <div>
              <h1 className="mb-2 md:text-2xl">
                <span className="mr-2">Taxes</span>
                {/* <div className="chip chip--small chip--info">
                      {initialData && initialData.length
                        ? initialData.length
                        : 0}
                    </div> */}
              </h1>
              <p className="text-sm md:text-base">
                Entity extended tax deadline: September 15, 2023
                <Tooltip title="The extended deadline for Allocations to file your K-1 with the IRS. We intend to file before this date.">
                  <IconButton>
                    <Image
                      width={18}
                      height={18}
                      src="/question.svg"
                      alt="question"
                    />
                  </IconButton>
                </Tooltip>
              </p>
            </div>
            <Button
              color={'info'}
              label={
                investorView ? 'Switch to fund manager' : 'Switch to investor'
              }
              icon={
                <Image
                  src="/switch.svg"
                  alt={'switch'}
                  className="text-xs opacity-50 md:text-base"
                  width={20}
                  height={20}
                />
              }
              onClick={() => setInvestorView(!investorView)}
            />
          </header>
          {showTips && (
            <div className="grid gap-2 mb-4">
              <Alert
                severity="success"
                className="text-xs"
                onClose={() => setShowTips(false)}
              >
                <p className="text-sm">What is a K-1?</p>
                <div>
                  <p>
                    Schedule K-1 is an Internal Revenue Service (IRS) tax form
                    issued annually for an investment in partnership interests
                    to report each partner&apos;s share of the
                    partnership&apos;s earnings, losses, deductions, and
                    credits. You can find your individual K-1 forms on your
                    dashboard after they are filed with the business return. K-1
                    forms are typically not included with personal tax returns,
                    but we encourage you to deliver your K-1 forms to your CPA.
                  </p>
                </div>
              </Alert>
              <Alert
                severity="success"
                className="text-xs"
                onClose={() => setShowTips(false)}
              >
                <p className="text-sm">
                  What if my K-1 isn&apos;t ready before the deadline for filing
                  my taxes?
                </p>
                <div>
                  <p>
                    While Allocations prioritizes issuing K-1s as soon as
                    possible, the deadline has been extended until 15 September
                    2023, typically due to pending information from a portfolio
                    company or investor.
                  </p>
                </div>
              </Alert>
            </div>
          )}
          <div className="w-full">
            {investorView && <TaxesInvestor />}
            {!investorView && <TaxesFundManager />}
          </div>
        </div>
      )}
    </>
  );
}
