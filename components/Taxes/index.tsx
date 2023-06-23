import { useAuthContext } from '@/app/(private)/context';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useFlags } from 'launchdarkly-react-client-sdk';
import Image from 'next/image';
import { useState } from 'react';
import Alert from '../Alert';
import None from '../None';
import PageHeader from '../Page/Header';
import TaxesFundManager from './FundManager';
import TaxesInvestor from './Investor';

export default function Taxes() {
  const [investorView, setInvestorView] = useState<boolean>(false);

  const { user } = useAuthContext();
  let { taxDashboard } = useFlags();

  return (
    <>
      {user && !taxDashboard && !user.is_super_admin && (
        <None text="Taxes are coming soon." />
      )}
      {user && (user.is_super_admin || taxDashboard) && (
        <div className="container bg-white border rounded container--card">
          <PageHeader
            header={{
              name: 'Taxes'
            }}
            subheader={
              <div className="text-sm md:text-sm">
                <span>Entity extended tax deadline: September 15, 2023</span>
                <Tooltip title="The extended deadline for Allocations to file your K-1 with the IRS. We intend to file before this date.">
                  <IconButton>
                    <Image
                      width={16}
                      height={16}
                      src="/question.svg"
                      alt="question"
                    />
                  </IconButton>
                </Tooltip>
                <div className="grid gap-2">
                  <Alert
                    color="bg-primary-50 text-primary-800"
                    content={
                      <div>
                        <h3 className="mb-1 font-bold">What is a K-1?</h3>
                        <span>
                          Schedule K-1 is an Internal Revenue Service (IRS) tax
                          form issued annually for an investment in partnership
                          interests to report each partner&apos;s share of the
                          partnership&apos;s earnings, losses, deductions, and
                          credits. You can find your individual K-1 forms on
                          your dashboard after they are filed with the business
                          return. K-1 forms are typically not included with
                          personal tax returns, but we encourage you to deliver
                          your K-1 forms to your CPA.
                        </span>
                      </div>
                    }
                  />
                  <Alert
                    color="bg-primary-50 text-primary-800"
                    content={
                      <div>
                        <h3 className="mb-1 font-bold">
                          What if my K-1 isn&apos;t ready before the deadline
                          for filing my taxes?
                        </h3>
                        <span>
                          While Allocations prioritizes issuing K-1s as soon as
                          possible, the deadline has been extended until 15
                          September 2023, typically due to pending information
                          from a portfolio company or investor.
                        </span>
                      </div>
                    }
                  />
                </div>
              </div>
            }
          />
          <div className="w-full">
            {investorView && <TaxesInvestor />}
            {!investorView && <TaxesFundManager />}
          </div>
        </div>
      )}
    </>
  );
}
