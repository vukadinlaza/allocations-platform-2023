import { Card, Text } from "@tremor/react";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function CardConfidential() {
    return (
        <Card className='flex h-fit bg-orange-100 border-0 mb-8'>
            <ExclamationTriangleIcon className="h-5 w-4 text-orange-900" aria-hidden="true" />
            <Text className='text-orange-900 ml-1'><strong>Confidential: </strong>Contacting founders or sharing information will result in removal from AngelList. This page contains unique identifiers and logs attempts to capture and share information.</Text>
        </Card>
    )
}