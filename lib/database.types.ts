export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Deal_Investments_Detail: {
        Row: {
          __v: string | null
          _id: string
          accredited_investor_notes: string | null
          airtable_organization_name: string | null
          capitalWiredAmount: string | null
          carry_fee_percent: string | null
          created_at: string | null
          custom_carry_fee: string | null
          custom_management_fee: string | null
          deal_id: string | null
          documents: Json | null
          invited_at: string | null
          management_fee_flat: string | null
          management_fee_percent: string | null
          "metadata.submission_data": string | null
          operational_notes: string | null
          organization: string | null
          passport_id: string | null
          phase: string | null
          signed_at: string | null
          status: string | null
          "submissionData.__typename": string | null
          "submissionData.accredited_investor_status": string | null
          "submissionData.clientIp": string | null
          "submissionData.country": string | null
          "submissionData.country_search": string | null
          "submissionData.dealId": string | null
          "submissionData.docSpringTemplateId": string | null
          "submissionData.fullName": string | null
          "submissionData.investmentAmount": string | null
          "submissionData.investmentId": string | null
          "submissionData.investor_type": string | null
          "submissionData.legalName": string | null
          "submissionData.state": string | null
          "submissionData.state_search": string | null
          "submissionData.submissionId": string | null
          "submissionData.title": string | null
          test: string | null
          total_committed_amount: string | null
          updated_at: string | null
          user_id: string | null
          wired_at: string | null
          "wireReminderSent.availableToSend": string | null
          "wireReminderSent.date": string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          accredited_investor_notes?: string | null
          airtable_organization_name?: string | null
          capitalWiredAmount?: string | null
          carry_fee_percent?: string | null
          created_at?: string | null
          custom_carry_fee?: string | null
          custom_management_fee?: string | null
          deal_id?: string | null
          documents?: Json | null
          invited_at?: string | null
          management_fee_flat?: string | null
          management_fee_percent?: string | null
          "metadata.submission_data"?: string | null
          operational_notes?: string | null
          organization?: string | null
          passport_id?: string | null
          phase?: string | null
          signed_at?: string | null
          status?: string | null
          "submissionData.__typename"?: string | null
          "submissionData.accredited_investor_status"?: string | null
          "submissionData.clientIp"?: string | null
          "submissionData.country"?: string | null
          "submissionData.country_search"?: string | null
          "submissionData.dealId"?: string | null
          "submissionData.docSpringTemplateId"?: string | null
          "submissionData.fullName"?: string | null
          "submissionData.investmentAmount"?: string | null
          "submissionData.investmentId"?: string | null
          "submissionData.investor_type"?: string | null
          "submissionData.legalName"?: string | null
          "submissionData.state"?: string | null
          "submissionData.state_search"?: string | null
          "submissionData.submissionId"?: string | null
          "submissionData.title"?: string | null
          test?: string | null
          total_committed_amount?: string | null
          updated_at?: string | null
          user_id?: string | null
          wired_at?: string | null
          "wireReminderSent.availableToSend"?: string | null
          "wireReminderSent.date"?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          accredited_investor_notes?: string | null
          airtable_organization_name?: string | null
          capitalWiredAmount?: string | null
          carry_fee_percent?: string | null
          created_at?: string | null
          custom_carry_fee?: string | null
          custom_management_fee?: string | null
          deal_id?: string | null
          documents?: Json | null
          invited_at?: string | null
          management_fee_flat?: string | null
          management_fee_percent?: string | null
          "metadata.submission_data"?: string | null
          operational_notes?: string | null
          organization?: string | null
          passport_id?: string | null
          phase?: string | null
          signed_at?: string | null
          status?: string | null
          "submissionData.__typename"?: string | null
          "submissionData.accredited_investor_status"?: string | null
          "submissionData.clientIp"?: string | null
          "submissionData.country"?: string | null
          "submissionData.country_search"?: string | null
          "submissionData.dealId"?: string | null
          "submissionData.docSpringTemplateId"?: string | null
          "submissionData.fullName"?: string | null
          "submissionData.investmentAmount"?: string | null
          "submissionData.investmentId"?: string | null
          "submissionData.investor_type"?: string | null
          "submissionData.legalName"?: string | null
          "submissionData.state"?: string | null
          "submissionData.state_search"?: string | null
          "submissionData.submissionId"?: string | null
          "submissionData.title"?: string | null
          test?: string | null
          total_committed_amount?: string | null
          updated_at?: string | null
          user_id?: string | null
          wired_at?: string | null
          "wireReminderSent.availableToSend"?: string | null
          "wireReminderSent.date"?: string | null
        }
      }
      Deals: {
        Row: {
          _id: string
          accept_crypto: string | null
          asset_type: string | null
          banking_provider: string | null
          carry_fee: string | null
          closed: string | null
          closing_date: string | null
          company_name: string | null
          created_at: string | null
          deal_term: string | null
          deal_type: string | null
          documents: string | null
          gp_entity: string | null
          international_investors: string | null
          investment_type: string | null
          invited_investors: string | null
          management_fee: string | null
          management_fee_dollar: string | null
          management_fee_frequency: string | null
          management_fee_percent: string | null
          management_fee_type: string | null
          manager_email: string | null
          manager_name: string | null
          manager_title: string | null
          manager_type: string | null
          metadata: string | null
          minimum_investment: string | null
          name: string | null
          need_gp_entity: string | null
          notes: string | null
          number_of_investors: string | null
          offering_type: string | null
          onboarding_link: string | null
          organization: string | null
          organization_id: string | null
          organization_name: string | null
          portfolio_company_name: string | null
          reporting_advisor: string | null
          reporting_advisor_fee: string | null
          series_name: string | null
          setup_cost: string | null
          side_letters: string | null
          sign_deadline: string | null
          status: string | null
          target: string | null
          target_raise_goal: string | null
          total_carry: string | null
          total_round_size: string | null
          type: string | null
          updated_at: string | null
          user_email: string | null
          user_id: string | null
          users_viewed: string | null
          wire_deadline: string | null
        }
        Insert: {
          _id: string
          accept_crypto?: string | null
          asset_type?: string | null
          banking_provider?: string | null
          carry_fee?: string | null
          closed?: string | null
          closing_date?: string | null
          company_name?: string | null
          created_at?: string | null
          deal_term?: string | null
          deal_type?: string | null
          documents?: string | null
          gp_entity?: string | null
          international_investors?: string | null
          investment_type?: string | null
          invited_investors?: string | null
          management_fee?: string | null
          management_fee_dollar?: string | null
          management_fee_frequency?: string | null
          management_fee_percent?: string | null
          management_fee_type?: string | null
          manager_email?: string | null
          manager_name?: string | null
          manager_title?: string | null
          manager_type?: string | null
          metadata?: string | null
          minimum_investment?: string | null
          name?: string | null
          need_gp_entity?: string | null
          notes?: string | null
          number_of_investors?: string | null
          offering_type?: string | null
          onboarding_link?: string | null
          organization?: string | null
          organization_id?: string | null
          organization_name?: string | null
          portfolio_company_name?: string | null
          reporting_advisor?: string | null
          reporting_advisor_fee?: string | null
          series_name?: string | null
          setup_cost?: string | null
          side_letters?: string | null
          sign_deadline?: string | null
          status?: string | null
          target?: string | null
          target_raise_goal?: string | null
          total_carry?: string | null
          total_round_size?: string | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string | null
          users_viewed?: string | null
          wire_deadline?: string | null
        }
        Update: {
          _id?: string
          accept_crypto?: string | null
          asset_type?: string | null
          banking_provider?: string | null
          carry_fee?: string | null
          closed?: string | null
          closing_date?: string | null
          company_name?: string | null
          created_at?: string | null
          deal_term?: string | null
          deal_type?: string | null
          documents?: string | null
          gp_entity?: string | null
          international_investors?: string | null
          investment_type?: string | null
          invited_investors?: string | null
          management_fee?: string | null
          management_fee_dollar?: string | null
          management_fee_frequency?: string | null
          management_fee_percent?: string | null
          management_fee_type?: string | null
          manager_email?: string | null
          manager_name?: string | null
          manager_title?: string | null
          manager_type?: string | null
          metadata?: string | null
          minimum_investment?: string | null
          name?: string | null
          need_gp_entity?: string | null
          notes?: string | null
          number_of_investors?: string | null
          offering_type?: string | null
          onboarding_link?: string | null
          organization?: string | null
          organization_id?: string | null
          organization_name?: string | null
          portfolio_company_name?: string | null
          reporting_advisor?: string | null
          reporting_advisor_fee?: string | null
          series_name?: string | null
          setup_cost?: string | null
          side_letters?: string | null
          sign_deadline?: string | null
          status?: string | null
          target?: string | null
          target_raise_goal?: string | null
          total_carry?: string | null
          total_round_size?: string | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string | null
          users_viewed?: string | null
          wire_deadline?: string | null
        }
      }
      Deals_2021_Investments: {
        Row: {
          __v: string | null
          _id: string
          address: string | null
          "allAirtableData.ledger": Json | null
          beginning_capital: string | null
          beginning_loss: string | null
          beginning_profit: string | null
          city: string | null
          contributions: string | null
          country: string | null
          createdAt: string | null
          disregarded_entity: string | null
          distributions: string | null
          email: string | null
          ending_capital: string | null
          ending_loss: string | null
          ending_profit: string | null
          "file.bucket": string | null
          "file.key": string | null
          foreign_entity: boolean | null
          investing_as: string | null
          investor_name: string | null
          "metadata.airtable_record_id": string | null
          "metadata.dashboard_display": string | null
          "metadata.need_tax_form": string | null
          name: string | null
          name_line_2: string | null
          postal_code: string | null
          state: string | null
          tax_class: string | null
          tax_id: string | null
          tax_return: string | null
          type: string | null
          updatedAt: string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          address?: string | null
          "allAirtableData.ledger"?: Json | null
          beginning_capital?: string | null
          beginning_loss?: string | null
          beginning_profit?: string | null
          city?: string | null
          contributions?: string | null
          country?: string | null
          createdAt?: string | null
          disregarded_entity?: string | null
          distributions?: string | null
          email?: string | null
          ending_capital?: string | null
          ending_loss?: string | null
          ending_profit?: string | null
          "file.bucket"?: string | null
          "file.key"?: string | null
          foreign_entity?: boolean | null
          investing_as?: string | null
          investor_name?: string | null
          "metadata.airtable_record_id"?: string | null
          "metadata.dashboard_display"?: string | null
          "metadata.need_tax_form"?: string | null
          name?: string | null
          name_line_2?: string | null
          postal_code?: string | null
          state?: string | null
          tax_class?: string | null
          tax_id?: string | null
          tax_return?: string | null
          type?: string | null
          updatedAt?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          address?: string | null
          "allAirtableData.ledger"?: Json | null
          beginning_capital?: string | null
          beginning_loss?: string | null
          beginning_profit?: string | null
          city?: string | null
          contributions?: string | null
          country?: string | null
          createdAt?: string | null
          disregarded_entity?: string | null
          distributions?: string | null
          email?: string | null
          ending_capital?: string | null
          ending_loss?: string | null
          ending_profit?: string | null
          "file.bucket"?: string | null
          "file.key"?: string | null
          foreign_entity?: boolean | null
          investing_as?: string | null
          investor_name?: string | null
          "metadata.airtable_record_id"?: string | null
          "metadata.dashboard_display"?: string | null
          "metadata.need_tax_form"?: string | null
          name?: string | null
          name_line_2?: string | null
          postal_code?: string | null
          state?: string | null
          tax_class?: string | null
          tax_id?: string | null
          tax_return?: string | null
          type?: string | null
          updatedAt?: string | null
        }
      }
      Deals_2021_Tax: {
        Row: {
          __v: string | null
          _id: string
          "allAirtableData.entity": string | null
          amended_return: string | null
          assets: string | null
          "authorization_file.bucket": string | null
          "authorization_file.key": string | null
          cash: string | null
          createdAt: string | null
          deal_name: string | null
          distribution: string | null
          distribution_date: string | null
          "entity.address": string | null
          "entity.city": string | null
          "entity.ein": string | null
          "entity.formation_date": string | null
          "entity.name": string | null
          "entity.phone_number": string | null
          "entity.state": string | null
          "entity.type": string | null
          equity: string | null
          "file.bucket": string | null
          "file.key": string | null
          initial_return: string | null
          investment_description: string | null
          last_year_assets: string | null
          last_year_cash: string | null
          last_year_liabilities: string | null
          liabilities: string | null
          liabilities_description: string | null
          manager_address: string | null
          manager_city: string | null
          manager_email: string | null
          manager_name: string | null
          manager_phone_number: string | null
          manager_postal_code: string | null
          manager_state: string | null
          "metadata.airtable_record_id": string | null
          "metadata.docspring_template_id": string | null
          "metadata.gosystem_return_id": string | null
          "metadata.organization_id": string | null
          phase: string | null
          portfolio_expense: string | null
          portfolio_expense_description: string | null
          provider: string | null
          "signed_authorization_file.bucket": string | null
          "signed_authorization_file.key": string | null
          signer_first_name: string | null
          signer_last_name: string | null
          signer_title: string | null
          tax_type: number | null
          tax_year: number | null
          "taxpayer_return_file.bucket": string | null
          "taxpayer_return_file.key": string | null
          total_contributions: string | null
          updatedAt: string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          "allAirtableData.entity"?: string | null
          amended_return?: string | null
          assets?: string | null
          "authorization_file.bucket"?: string | null
          "authorization_file.key"?: string | null
          cash?: string | null
          createdAt?: string | null
          deal_name?: string | null
          distribution?: string | null
          distribution_date?: string | null
          "entity.address"?: string | null
          "entity.city"?: string | null
          "entity.ein"?: string | null
          "entity.formation_date"?: string | null
          "entity.name"?: string | null
          "entity.phone_number"?: string | null
          "entity.state"?: string | null
          "entity.type"?: string | null
          equity?: string | null
          "file.bucket"?: string | null
          "file.key"?: string | null
          initial_return?: string | null
          investment_description?: string | null
          last_year_assets?: string | null
          last_year_cash?: string | null
          last_year_liabilities?: string | null
          liabilities?: string | null
          liabilities_description?: string | null
          manager_address?: string | null
          manager_city?: string | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone_number?: string | null
          manager_postal_code?: string | null
          manager_state?: string | null
          "metadata.airtable_record_id"?: string | null
          "metadata.docspring_template_id"?: string | null
          "metadata.gosystem_return_id"?: string | null
          "metadata.organization_id"?: string | null
          phase?: string | null
          portfolio_expense?: string | null
          portfolio_expense_description?: string | null
          provider?: string | null
          "signed_authorization_file.bucket"?: string | null
          "signed_authorization_file.key"?: string | null
          signer_first_name?: string | null
          signer_last_name?: string | null
          signer_title?: string | null
          tax_type?: number | null
          tax_year?: number | null
          "taxpayer_return_file.bucket"?: string | null
          "taxpayer_return_file.key"?: string | null
          total_contributions?: string | null
          updatedAt?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          "allAirtableData.entity"?: string | null
          amended_return?: string | null
          assets?: string | null
          "authorization_file.bucket"?: string | null
          "authorization_file.key"?: string | null
          cash?: string | null
          createdAt?: string | null
          deal_name?: string | null
          distribution?: string | null
          distribution_date?: string | null
          "entity.address"?: string | null
          "entity.city"?: string | null
          "entity.ein"?: string | null
          "entity.formation_date"?: string | null
          "entity.name"?: string | null
          "entity.phone_number"?: string | null
          "entity.state"?: string | null
          "entity.type"?: string | null
          equity?: string | null
          "file.bucket"?: string | null
          "file.key"?: string | null
          initial_return?: string | null
          investment_description?: string | null
          last_year_assets?: string | null
          last_year_cash?: string | null
          last_year_liabilities?: string | null
          liabilities?: string | null
          liabilities_description?: string | null
          manager_address?: string | null
          manager_city?: string | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone_number?: string | null
          manager_postal_code?: string | null
          manager_state?: string | null
          "metadata.airtable_record_id"?: string | null
          "metadata.docspring_template_id"?: string | null
          "metadata.gosystem_return_id"?: string | null
          "metadata.organization_id"?: string | null
          phase?: string | null
          portfolio_expense?: string | null
          portfolio_expense_description?: string | null
          provider?: string | null
          "signed_authorization_file.bucket"?: string | null
          "signed_authorization_file.key"?: string | null
          signer_first_name?: string | null
          signer_last_name?: string | null
          signer_title?: string | null
          tax_type?: number | null
          tax_year?: number | null
          "taxpayer_return_file.bucket"?: string | null
          "taxpayer_return_file.key"?: string | null
          total_contributions?: string | null
          updatedAt?: string | null
        }
      }
      Deals_Extensions_Filed: {
        Row: {
          "163J SUBJECT TO": string | null
          "199A Suppress (2021)": string | null
          "2022 Address Change": string | null
          "2022 Amended Return": string | null
          "2022 Box 4": string | null
          "2022 Cash": string | null
          "2022 Contributions": string | null
          "2022 Current Liability": string | null
          "2022 Distribution": string | null
          "2022 Expense": string | null
          "2022 Final Return": string | null
          "2022 GS Status": string | null
          "2022 Initial Return": string | null
          "2022 Long Term Assets": string | null
          "2022 Name Change": string | null
          "2022 Return (from Deal Name)": string | null
          "2022 Sch M2 Date": string | null
          "8990 OPT SUPP PRINT": string | null
          "Accounting Method": string | null
          Address: string | null
          "Business Code Number": number | null
          "CAPITAL CONTRIBUTIONS SA": string | null
          "CAPITAL CONTRIBUTIONS SA DESC": string | null
          "CASH DISTRIBUTION SA": string | null
          "CASH DISTRIBUTION SA DESC": string | null
          City: string | null
          "Deal Name": string | null
          EIN: string | null
          Email: string | null
          "Extension Status": string | null
          "Fund Manager Email": string | null
          "Fund Manager Name": string | null
          "K-2 Part II - 2022": string | null
          "K-2 Part II SA - 2022": string | null
          "K-2 Part II SA Desc": string | null
          "K-2 Part X - 2022": string | null
          "K-2 Part X Amount - 2022": string | null
          "K-2 Part X SA - 2022": string | null
          "K-2 Part X SA Desc": string | null
          Notes: string | null
          "Ownership % Calc Prelim Rollup (from Ledger) MAX 2022": string | null
          "Ownership % Rounding 2022": string | null
          Phone: string | null
          "Portfolio Wire Date": string | null
          "PR City": string | null
          "PR DI City": string | null
          "PR DI First Name": string | null
          "PR DI Last Name": string | null
          "PR DI Phone": string | null
          "PR DI State": string | null
          "PR DI Street": string | null
          "PR DI Zip": string | null
          "PR is Entity": string | null
          "PR Name": string | null
          "PR Phone": string | null
          "PR State": string | null
          "PR Street": string | null
          "PR Zip": number | null
          "Principal Business Activity": string | null
          "Principal Product or Service": string | null
          "Priority Filing": string | null
          "Receives K-1": string | null
          returnId: string
          "Sch K - Portfolio Expense Description": string | null
          "Sch K Portfolio Exp SA": string | null
          "Sch K Portfolio Exp SA Desc": string | null
          "Sch L - Investment Description": string | null
          "Sch L - Liabilities Description": string | null
          "SCHEDULE K-2 - 2022": string | null
          Screenshots: string | null
          "Signature Date": string | null
          "Signer First Name": string | null
          "Signer Last Name": string | null
          "Signer Title": string | null
          "SPV/Fund Name": string | null
          State: string | null
          Type: string | null
          "Type - Long": string | null
          ZIP: number | null
        }
        Insert: {
          "163J SUBJECT TO"?: string | null
          "199A Suppress (2021)"?: string | null
          "2022 Address Change"?: string | null
          "2022 Amended Return"?: string | null
          "2022 Box 4"?: string | null
          "2022 Cash"?: string | null
          "2022 Contributions"?: string | null
          "2022 Current Liability"?: string | null
          "2022 Distribution"?: string | null
          "2022 Expense"?: string | null
          "2022 Final Return"?: string | null
          "2022 GS Status"?: string | null
          "2022 Initial Return"?: string | null
          "2022 Long Term Assets"?: string | null
          "2022 Name Change"?: string | null
          "2022 Return (from Deal Name)"?: string | null
          "2022 Sch M2 Date"?: string | null
          "8990 OPT SUPP PRINT"?: string | null
          "Accounting Method"?: string | null
          Address?: string | null
          "Business Code Number"?: number | null
          "CAPITAL CONTRIBUTIONS SA"?: string | null
          "CAPITAL CONTRIBUTIONS SA DESC"?: string | null
          "CASH DISTRIBUTION SA"?: string | null
          "CASH DISTRIBUTION SA DESC"?: string | null
          City?: string | null
          "Deal Name"?: string | null
          EIN?: string | null
          Email?: string | null
          "Extension Status"?: string | null
          "Fund Manager Email"?: string | null
          "Fund Manager Name"?: string | null
          "K-2 Part II - 2022"?: string | null
          "K-2 Part II SA - 2022"?: string | null
          "K-2 Part II SA Desc"?: string | null
          "K-2 Part X - 2022"?: string | null
          "K-2 Part X Amount - 2022"?: string | null
          "K-2 Part X SA - 2022"?: string | null
          "K-2 Part X SA Desc"?: string | null
          Notes?: string | null
          "Ownership % Calc Prelim Rollup (from Ledger) MAX 2022"?:
            | string
            | null
          "Ownership % Rounding 2022"?: string | null
          Phone?: string | null
          "Portfolio Wire Date"?: string | null
          "PR City"?: string | null
          "PR DI City"?: string | null
          "PR DI First Name"?: string | null
          "PR DI Last Name"?: string | null
          "PR DI Phone"?: string | null
          "PR DI State"?: string | null
          "PR DI Street"?: string | null
          "PR DI Zip"?: string | null
          "PR is Entity"?: string | null
          "PR Name"?: string | null
          "PR Phone"?: string | null
          "PR State"?: string | null
          "PR Street"?: string | null
          "PR Zip"?: number | null
          "Principal Business Activity"?: string | null
          "Principal Product or Service"?: string | null
          "Priority Filing"?: string | null
          "Receives K-1"?: string | null
          returnId: string
          "Sch K - Portfolio Expense Description"?: string | null
          "Sch K Portfolio Exp SA"?: string | null
          "Sch K Portfolio Exp SA Desc"?: string | null
          "Sch L - Investment Description"?: string | null
          "Sch L - Liabilities Description"?: string | null
          "SCHEDULE K-2 - 2022"?: string | null
          Screenshots?: string | null
          "Signature Date"?: string | null
          "Signer First Name"?: string | null
          "Signer Last Name"?: string | null
          "Signer Title"?: string | null
          "SPV/Fund Name"?: string | null
          State?: string | null
          Type?: string | null
          "Type - Long"?: string | null
          ZIP?: number | null
        }
        Update: {
          "163J SUBJECT TO"?: string | null
          "199A Suppress (2021)"?: string | null
          "2022 Address Change"?: string | null
          "2022 Amended Return"?: string | null
          "2022 Box 4"?: string | null
          "2022 Cash"?: string | null
          "2022 Contributions"?: string | null
          "2022 Current Liability"?: string | null
          "2022 Distribution"?: string | null
          "2022 Expense"?: string | null
          "2022 Final Return"?: string | null
          "2022 GS Status"?: string | null
          "2022 Initial Return"?: string | null
          "2022 Long Term Assets"?: string | null
          "2022 Name Change"?: string | null
          "2022 Return (from Deal Name)"?: string | null
          "2022 Sch M2 Date"?: string | null
          "8990 OPT SUPP PRINT"?: string | null
          "Accounting Method"?: string | null
          Address?: string | null
          "Business Code Number"?: number | null
          "CAPITAL CONTRIBUTIONS SA"?: string | null
          "CAPITAL CONTRIBUTIONS SA DESC"?: string | null
          "CASH DISTRIBUTION SA"?: string | null
          "CASH DISTRIBUTION SA DESC"?: string | null
          City?: string | null
          "Deal Name"?: string | null
          EIN?: string | null
          Email?: string | null
          "Extension Status"?: string | null
          "Fund Manager Email"?: string | null
          "Fund Manager Name"?: string | null
          "K-2 Part II - 2022"?: string | null
          "K-2 Part II SA - 2022"?: string | null
          "K-2 Part II SA Desc"?: string | null
          "K-2 Part X - 2022"?: string | null
          "K-2 Part X Amount - 2022"?: string | null
          "K-2 Part X SA - 2022"?: string | null
          "K-2 Part X SA Desc"?: string | null
          Notes?: string | null
          "Ownership % Calc Prelim Rollup (from Ledger) MAX 2022"?:
            | string
            | null
          "Ownership % Rounding 2022"?: string | null
          Phone?: string | null
          "Portfolio Wire Date"?: string | null
          "PR City"?: string | null
          "PR DI City"?: string | null
          "PR DI First Name"?: string | null
          "PR DI Last Name"?: string | null
          "PR DI Phone"?: string | null
          "PR DI State"?: string | null
          "PR DI Street"?: string | null
          "PR DI Zip"?: string | null
          "PR is Entity"?: string | null
          "PR Name"?: string | null
          "PR Phone"?: string | null
          "PR State"?: string | null
          "PR Street"?: string | null
          "PR Zip"?: number | null
          "Principal Business Activity"?: string | null
          "Principal Product or Service"?: string | null
          "Priority Filing"?: string | null
          "Receives K-1"?: string | null
          returnId?: string
          "Sch K - Portfolio Expense Description"?: string | null
          "Sch K Portfolio Exp SA"?: string | null
          "Sch K Portfolio Exp SA Desc"?: string | null
          "Sch L - Investment Description"?: string | null
          "Sch L - Liabilities Description"?: string | null
          "SCHEDULE K-2 - 2022"?: string | null
          Screenshots?: string | null
          "Signature Date"?: string | null
          "Signer First Name"?: string | null
          "Signer Last Name"?: string | null
          "Signer Title"?: string | null
          "SPV/Fund Name"?: string | null
          State?: string | null
          Type?: string | null
          "Type - Long"?: string | null
          ZIP?: number | null
        }
      }
      Deals_Investments: {
        Row: {
          _id: string
          deal_id: string | null
          internal_id: string | null
          passport_id: string | null
          total_committed_amount: string | null
          user_id: string | null
        }
        Insert: {
          _id: string
          deal_id?: string | null
          internal_id?: string | null
          passport_id?: string | null
          total_committed_amount?: string | null
          user_id?: string | null
        }
        Update: {
          _id?: string
          deal_id?: string | null
          internal_id?: string | null
          passport_id?: string | null
          total_committed_amount?: string | null
          user_id?: string | null
        }
      }
      Deals_Investments_Airtable: {
        Row: {
          "2022 K-1 13W": string | null
          "2022 K-1 13W Manual": string | null
          "2022 K-1 13W override": string | null
          "2022 K-1 13W Prelim": string | null
          "2022 K-1 13W Prelim Rollup (from Ledger) 2 Rollup (from Entity ":
            | string
            | null
          "2022 K-1 13W Rounding Rollup (from Entity Summary)": string | null
          "2022 K-2 Part X Amount": string | null
          "2022 K-3 Part II": string | null
          "2022 K-3 Part X": string | null
          "2022 K-3 Part X Amount": string | null
          "2022 Total Expense": string | null
          "Airtable Record ID": string
          "Count (Entity Summary)": string | null
          "Deal Name": string | null
          Email: string | null
          "Entity Summary": string | null
          "Investor Name/Entity": string | null
          "J - End Capital (2021)": string | null
          "J - End Capital (2022)": string | null
          "J - End Loss (2021)": string | null
          "J - End Loss (2022)": string | null
          "J - End Profit (2021)": string | null
          "J - End Profit (2022)": string | null
          "K-1 Upload": string | null
          "L - Contributions (2021)": string | null
          "L - Contributions (2022)": string | null
          "L - Distributions (2021)": string | null
          "L - Distributions (2022)": string | null
          "L - End Capital (2020)": string | null
          "L - End Capital (2022)": string | null
          "L - Net Gain/Loss (2021)": string | null
          "LP Entities": string | null
          Name: string | null
          "Net Investment": string | null
          "Ownership % Calc 2021": string | null
          "Ownership % Calc 2022": string | null
          "Ownership % Calc Prelim (2021)": string | null
          "Ownership % Calc Prelim (2022)": string | null
          "Ownership % Calc Prelim Rollup (from Ledger) MAX 2022 Rollup (f":
            | string
            | null
          "Ownership % Manual (2022)": string | null
          "Ownership % Rounding (2022)": string | null
          "Ownership % Rounding Rollup (from Entity Summary) 2022":
            | string
            | null
          "Profit Share Override (2021)": string | null
          "Request W8/9": string | null
          "Review Notes": string | null
          "Tax Software": string | null
          "Total Contributions (2022)": string | null
        }
        Insert: {
          "2022 K-1 13W"?: string | null
          "2022 K-1 13W Manual"?: string | null
          "2022 K-1 13W override"?: string | null
          "2022 K-1 13W Prelim"?: string | null
          "2022 K-1 13W Prelim Rollup (from Ledger) 2 Rollup (from Entity "?:
            | string
            | null
          "2022 K-1 13W Rounding Rollup (from Entity Summary)"?: string | null
          "2022 K-2 Part X Amount"?: string | null
          "2022 K-3 Part II"?: string | null
          "2022 K-3 Part X"?: string | null
          "2022 K-3 Part X Amount"?: string | null
          "2022 Total Expense"?: string | null
          "Airtable Record ID": string
          "Count (Entity Summary)"?: string | null
          "Deal Name"?: string | null
          Email?: string | null
          "Entity Summary"?: string | null
          "Investor Name/Entity"?: string | null
          "J - End Capital (2021)"?: string | null
          "J - End Capital (2022)"?: string | null
          "J - End Loss (2021)"?: string | null
          "J - End Loss (2022)"?: string | null
          "J - End Profit (2021)"?: string | null
          "J - End Profit (2022)"?: string | null
          "K-1 Upload"?: string | null
          "L - Contributions (2021)"?: string | null
          "L - Contributions (2022)"?: string | null
          "L - Distributions (2021)"?: string | null
          "L - Distributions (2022)"?: string | null
          "L - End Capital (2020)"?: string | null
          "L - End Capital (2022)"?: string | null
          "L - Net Gain/Loss (2021)"?: string | null
          "LP Entities"?: string | null
          Name?: string | null
          "Net Investment"?: string | null
          "Ownership % Calc 2021"?: string | null
          "Ownership % Calc 2022"?: string | null
          "Ownership % Calc Prelim (2021)"?: string | null
          "Ownership % Calc Prelim (2022)"?: string | null
          "Ownership % Calc Prelim Rollup (from Ledger) MAX 2022 Rollup (f"?:
            | string
            | null
          "Ownership % Manual (2022)"?: string | null
          "Ownership % Rounding (2022)"?: string | null
          "Ownership % Rounding Rollup (from Entity Summary) 2022"?:
            | string
            | null
          "Profit Share Override (2021)"?: string | null
          "Request W8/9"?: string | null
          "Review Notes"?: string | null
          "Tax Software"?: string | null
          "Total Contributions (2022)"?: string | null
        }
        Update: {
          "2022 K-1 13W"?: string | null
          "2022 K-1 13W Manual"?: string | null
          "2022 K-1 13W override"?: string | null
          "2022 K-1 13W Prelim"?: string | null
          "2022 K-1 13W Prelim Rollup (from Ledger) 2 Rollup (from Entity "?:
            | string
            | null
          "2022 K-1 13W Rounding Rollup (from Entity Summary)"?: string | null
          "2022 K-2 Part X Amount"?: string | null
          "2022 K-3 Part II"?: string | null
          "2022 K-3 Part X"?: string | null
          "2022 K-3 Part X Amount"?: string | null
          "2022 Total Expense"?: string | null
          "Airtable Record ID"?: string
          "Count (Entity Summary)"?: string | null
          "Deal Name"?: string | null
          Email?: string | null
          "Entity Summary"?: string | null
          "Investor Name/Entity"?: string | null
          "J - End Capital (2021)"?: string | null
          "J - End Capital (2022)"?: string | null
          "J - End Loss (2021)"?: string | null
          "J - End Loss (2022)"?: string | null
          "J - End Profit (2021)"?: string | null
          "J - End Profit (2022)"?: string | null
          "K-1 Upload"?: string | null
          "L - Contributions (2021)"?: string | null
          "L - Contributions (2022)"?: string | null
          "L - Distributions (2021)"?: string | null
          "L - Distributions (2022)"?: string | null
          "L - End Capital (2020)"?: string | null
          "L - End Capital (2022)"?: string | null
          "L - Net Gain/Loss (2021)"?: string | null
          "LP Entities"?: string | null
          Name?: string | null
          "Net Investment"?: string | null
          "Ownership % Calc 2021"?: string | null
          "Ownership % Calc 2022"?: string | null
          "Ownership % Calc Prelim (2021)"?: string | null
          "Ownership % Calc Prelim (2022)"?: string | null
          "Ownership % Calc Prelim Rollup (from Ledger) MAX 2022 Rollup (f"?:
            | string
            | null
          "Ownership % Manual (2022)"?: string | null
          "Ownership % Rounding (2022)"?: string | null
          "Ownership % Rounding Rollup (from Entity Summary) 2022"?:
            | string
            | null
          "Profit Share Override (2021)"?: string | null
          "Request W8/9"?: string | null
          "Review Notes"?: string | null
          "Tax Software"?: string | null
          "Total Contributions (2022)"?: string | null
        }
      }
      Deals_Tax: {
        Row: {
          _id: string
          carry_percentage: string | null
          certificate_of_formation: string | null
          cpa_reviewed: string | null
          deal_id: string | null
          designated_individual_address: string | null
          designated_individual_full_name: string | null
          designated_individual_phone: string | null
          ein_letter_from_irs: string | null
          entity_ein: string | null
          entity_formal_name: string | null
          entity_formation_date: string | null
          extension_status: string | null
          gosystem_return_id: string | null
          management_fee: string | null
          missing_extensions: string | null
          operating_agreement: string | null
          partner_formal_name: string | null
          partner_tax_id: string | null
          received_information: string | null
          signed_fund_manager: string | null
        }
        Insert: {
          _id: string
          carry_percentage?: string | null
          certificate_of_formation?: string | null
          cpa_reviewed?: string | null
          deal_id?: string | null
          designated_individual_address?: string | null
          designated_individual_full_name?: string | null
          designated_individual_phone?: string | null
          ein_letter_from_irs?: string | null
          entity_ein?: string | null
          entity_formal_name?: string | null
          entity_formation_date?: string | null
          extension_status?: string | null
          gosystem_return_id?: string | null
          management_fee?: string | null
          missing_extensions?: string | null
          operating_agreement?: string | null
          partner_formal_name?: string | null
          partner_tax_id?: string | null
          received_information?: string | null
          signed_fund_manager?: string | null
        }
        Update: {
          _id?: string
          carry_percentage?: string | null
          certificate_of_formation?: string | null
          cpa_reviewed?: string | null
          deal_id?: string | null
          designated_individual_address?: string | null
          designated_individual_full_name?: string | null
          designated_individual_phone?: string | null
          ein_letter_from_irs?: string | null
          entity_ein?: string | null
          entity_formal_name?: string | null
          entity_formation_date?: string | null
          extension_status?: string | null
          gosystem_return_id?: string | null
          management_fee?: string | null
          missing_extensions?: string | null
          operating_agreement?: string | null
          partner_formal_name?: string | null
          partner_tax_id?: string | null
          received_information?: string | null
          signed_fund_manager?: string | null
        }
      }
      Migrations: {
        Row: {
          created_at: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          id?: number
        }
      }
      Organizations: {
        Row: {
          adminInvites: string | null
          approved: boolean | null
          created_at: string | null
          high_volume_partner: boolean | null
          id: string
          legal_name: string | null
          mou_signed: boolean | null
          name: string | null
          phase: string | null
          slug: string | null
          updated_at: string | null
        }
        Insert: {
          adminInvites?: string | null
          approved?: boolean | null
          created_at?: string | null
          high_volume_partner?: boolean | null
          id: string
          legal_name?: string | null
          mou_signed?: boolean | null
          name?: string | null
          phase?: string | null
          slug?: string | null
          updated_at?: string | null
        }
        Update: {
          adminInvites?: string | null
          approved?: boolean | null
          created_at?: string | null
          high_volume_partner?: boolean | null
          id?: string
          legal_name?: string | null
          mou_signed?: boolean | null
          name?: string | null
          phase?: string | null
          slug?: string | null
          updated_at?: string | null
        }
      }
      Organizations_Migrated: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
      Users: {
        Row: {
          _id: string
          account: string | null
          accredidation_doc: string | null
          accredidation_status: string | null
          accredited_investor_status: string | null
          admin: string | null
          allocations_angel: string | null
          city: string | null
          country: string | null
          created_at: string | null
          display_username: string | null
          dob: string | null
          documents: string | null
          email: string | null
          entity_name: string | null
          first_name: string | null
          investor_type: string | null
          last_name: string | null
          linkedinUrl: string | null
          mail_city: string | null
          mail_country: string | null
          mail_state: string | null
          mail_street_address: string | null
          mail_zip: string | null
          organizations_admin: string | null
          passport: string | null
          profileBio: string | null
          profileImageKey: string | null
          sectors: string | null
          showBuild: string | null
          showCredit: string | null
          showInvestAndMrkPlc: string | null
          signer_full_name: string | null
          stages: string | null
          state: string | null
          street_address: string | null
          subscuber_entity_name: string | null
          username: string | null
          zip: string | null
        }
        Insert: {
          _id: string
          account?: string | null
          accredidation_doc?: string | null
          accredidation_status?: string | null
          accredited_investor_status?: string | null
          admin?: string | null
          allocations_angel?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          display_username?: string | null
          dob?: string | null
          documents?: string | null
          email?: string | null
          entity_name?: string | null
          first_name?: string | null
          investor_type?: string | null
          last_name?: string | null
          linkedinUrl?: string | null
          mail_city?: string | null
          mail_country?: string | null
          mail_state?: string | null
          mail_street_address?: string | null
          mail_zip?: string | null
          organizations_admin?: string | null
          passport?: string | null
          profileBio?: string | null
          profileImageKey?: string | null
          sectors?: string | null
          showBuild?: string | null
          showCredit?: string | null
          showInvestAndMrkPlc?: string | null
          signer_full_name?: string | null
          stages?: string | null
          state?: string | null
          street_address?: string | null
          subscuber_entity_name?: string | null
          username?: string | null
          zip?: string | null
        }
        Update: {
          _id?: string
          account?: string | null
          accredidation_doc?: string | null
          accredidation_status?: string | null
          accredited_investor_status?: string | null
          admin?: string | null
          allocations_angel?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          display_username?: string | null
          dob?: string | null
          documents?: string | null
          email?: string | null
          entity_name?: string | null
          first_name?: string | null
          investor_type?: string | null
          last_name?: string | null
          linkedinUrl?: string | null
          mail_city?: string | null
          mail_country?: string | null
          mail_state?: string | null
          mail_street_address?: string | null
          mail_zip?: string | null
          organizations_admin?: string | null
          passport?: string | null
          profileBio?: string | null
          profileImageKey?: string | null
          sectors?: string | null
          showBuild?: string | null
          showCredit?: string | null
          showInvestAndMrkPlc?: string | null
          signer_full_name?: string | null
          stages?: string | null
          state?: string | null
          street_address?: string | null
          subscuber_entity_name?: string | null
          username?: string | null
          zip?: string | null
        }
      }
      Users_Passports: {
        Row: {
          __v: string | null
          _id: string
          created_at: string | null
          passport_id: string | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          created_at?: string | null
          passport_id?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          created_at?: string | null
          passport_id?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
