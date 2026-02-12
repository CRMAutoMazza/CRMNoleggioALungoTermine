
async function checkApi() {
    try {
        console.log('Fetching from http://localhost:3000/leads ...');
        const response = await fetch('http://localhost:3000/leads');

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            const text = await response.text();
            console.error('Body:', text);
            return;
        }

        const leads = await response.json();
        console.log(`API returned ${leads.length} leads.`);

        // Find lead 89
        const lead89 = leads.find(l => {
            return (l.data && l.data.wp_id == 89) || l.wp_id == 89;
        });

        if (lead89) {
            console.log('SUCCESS: Lead 89 found in API response!');
            // console.log(JSON.stringify(lead89, null, 2));
        } else {
            console.log('FAILURE: Lead 89 NOT found in API response.');
            console.log('Recent Leads:', leads.slice(0, 5).map(l => ({ id: l.id, wp: l.data?.wp_id, name: l.firstName })));
        }

    } catch (error) {
        console.error('Request Failed:', error.message);
    }
}

checkApi();
